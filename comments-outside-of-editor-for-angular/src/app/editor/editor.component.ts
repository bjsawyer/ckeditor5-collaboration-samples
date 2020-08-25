import * as CKSource from '../../../vendor/ckeditor5/build/cksource'

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core'

import { CKEditor5 } from '@ckeditor/ckeditor5-angular'
import { CloudServicesConfig } from './common-interfaces'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  @Output() ready = new EventEmitter<CKEditor5.Editor>()
  @ViewChild('sidebar') private sidebarContainer?: ElementRef<HTMLDivElement>
  @ViewChildren('customControl') private customControls: QueryList<
    ElementRef<HTMLElement>
  >
  Editor = CKSource.ClassicEditor
  data = this.getInitialData()
  watchdog: any
  private sidebar = document.createElement('div')

  ngOnInit(): void {
    const contextConfig = {
      sidebar: {
        container: this.sidebar,
      },
    }

    this.watchdog = new CKSource.ContextWatchdog(CKSource.Context)
    this.watchdog.setCreator(async (config: any) => {
      const context = await CKSource.Context.create(config)
      this.initIntegration(context)
      return context
    })

    this.watchdog.create(contextConfig).then(() => {
      console.log('ready')
    })
  }

  ngAfterViewInit(): void {
    if (!this.sidebarContainer) {
      throw new Error('Div container for sidebar was not found')
    }
    this.sidebarContainer.nativeElement.appendChild(this.sidebar)
  }

  onClick(event: Event, threadId: string) {
    const context = this.watchdog.context
    const repository = context.plugins.get('CommentsRepository')
    const channelId = context.config.get('collaboration.channelId')
    const fieldHolder = (event.currentTarget as HTMLElement).parentNode

    if (!repository.hasCommentThread(threadId)) {
      repository.openNewCommentThread({ channelId, threadId, target: fieldHolder })
    } else {
      repository.setActiveCommentThread(threadId)
    }
  }

  private initIntegration(context) {
    const repository = context.plugins.get('CommentsRepository')
    const annotations = context.plugins.get('Annotations')
    const controls = this.customControls

    for (const thread of repository.getCommentThreads({ channelId })) {
      _handleCommentThread(thread)
    }

    repository.on(
      'addCommentThread:' + channelId,
      (evt, { threadId }) => {
        _handleCommentThread(repository.getCommentThread(threadId))
      },
      { priority: 'low' }
    )

    repository.on(
      'removeCommentThread:' + channelId,
      (evt, { threadId }) => {
        const fieldHolder = this.customControls.find(
          (item) => item.nativeElement.id === threadId
        ).nativeElement
        fieldHolder.classList.remove('has-comment', 'active')
        annotations.focusTracker.remove(fieldHolder)
      },
      { priority: 'low' }
    )

    repository.on('change:activeCommentThread', (evt, name, thread) => {
      // Remove highlight from previously highlighted field.
      this.customControls.forEach((item) => {
        item.nativeElement.classList.remove('active')
      })

      // Highlight another field, if applicable.
      if (thread) {
        const fieldHolderContainer = this.customControls.find(
          (item) => item.nativeElement.id === thread.id
        )

        if (fieldHolderContainer) {
          fieldHolderContainer.nativeElement.classList.add('active')
        }
      }
    })

    function _handleCommentThread(thread) {
      const fieldHolder = controls.find(
        (container) => container.nativeElement.id === thread.id
      ).nativeElement

      if (!thread.isAttached) {
        thread.attachTo(fieldHolder)
      }

      // Add highlight to the holder element to show that the field has a comment.
      fieldHolder.classList.add('has-comment')
      const threadView = repository._threadToController.get(thread).view
      const annotationView = annotations.getAnnotationView(threadView)
      annotationView.focusTracker.add(fieldHolder)
      annotations.focusTracker.add(fieldHolder)
    }
  }

  private getInitialData() {
    return `
	<h2>Bilingual Personality Disorder</h2>
	<p>
		This may be the first time you hear about this made-up disorder but it actually isn’t so far from the truth. Even the studies
		that were conducted almost half a century show that <strong>the language you speak has more effects on you than you realize</strong>.
	</p>
	<p>
		One of the very first experiments conducted on this topic dates back to 1964.
		<a href="https://www.researchgate.net/publication/9440038_Language_and_TAT_content_in_bilinguals">In the experiment</a>
		designed by linguist Ervin-Tripp who is an expert in psycholinguistic and sociolinguistic studies, adults who are bilingual
		in English in French were showed series of pictures and were asked to create 3-minute stories. In the end participants emphasized
		drastically different dynamics for stories in English and French.
	</p>
`
  }
}
