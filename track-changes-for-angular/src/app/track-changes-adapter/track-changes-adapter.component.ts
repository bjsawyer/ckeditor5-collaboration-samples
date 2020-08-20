import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { CKEditor5 } from '@ckeditor/ckeditor5-angular'

import * as ClassicEditorWithTrackChanges from '../../../vendor/ckeditor5/build/classic-editor-with-track-changes.js'
import { initialData } from './data'
import { getTrackChangesAdapter } from './track-changes-adapter'

@Component({
  selector: 'app-track-changes-adapter',
  templateUrl: './track-changes-adapter.component.html',
  styleUrls: ['./track-changes-adapter.component.css'],
})
export class TrackChangesAdapterComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() intialHtml = ''
  @Output() ready = new EventEmitter<CKEditor5.Editor>()

  CustomEditorBuild = ClassicEditorWithTrackChanges
  editor?: CKEditor5.Editor

  // Note that Angular refs can be used once the view is initialized so we need to create
  // this container and use in the above editor configuration to work around this problem.
  private sidebar = document.createElement('div')
  private boundRefreshDisplayMode = this.refreshDisplayMode.bind(this)
  private boundCheckPendingActions = this.checkPendingActions.bind(this)

  @ViewChild('sidebar') private sidebarContainer?: ElementRef<HTMLDivElement>

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.sidebarContainer) {
      throw new Error('Div container for sidebar was not found')
    }

    this.sidebarContainer.nativeElement.appendChild(this.sidebar)
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.boundRefreshDisplayMode)
    window.removeEventListener('beforeunload', this.boundCheckPendingActions)
  }

  onReady(editor: CKEditor5.Editor): void {
    this.editor = editor
    this.ready.emit(editor)
    // Make the track changes mode the "default" state by turning it on right after the editor initializes.
    this.editor.execute('trackChanges')
    // Prevent closing the tab when any action is pending.
    window.addEventListener('beforeunload', this.boundCheckPendingActions)
    // Switch between inline and sidebar annotations according to the window size.
    window.addEventListener('resize', this.boundRefreshDisplayMode)
    this.refreshDisplayMode()
  }

  private checkPendingActions(event: Event): void {
    if (this.editor.plugins.get('PendingActions').hasAny) {
      event.preventDefault()
      event.returnValue = true
    }
  }

  private refreshDisplayMode(): void {
    const annotations = this.editor.plugins.get('Annotations')
    const sidebarElement = this.sidebarContainer.nativeElement

    if (window.innerWidth < 1070) {
      sidebarElement.classList.remove('narrow')
      sidebarElement.classList.add('hidden')
      annotations.switchTo('inline')
    } else if (window.innerWidth < 1300) {
      sidebarElement.classList.remove('hidden')
      sidebarElement.classList.add('narrow')
      annotations.switchTo('narrowSidebar')
    } else {
      sidebarElement.classList.remove('hidden', 'narrow')
      annotations.switchTo('wideSidebar')
    }
  }

  get editorConfig(): object {
    return {
      extraPlugins: [getTrackChangesAdapter(initialData)],
      sidebar: {
        container: this.sidebar,
      },
      licenseKey: window.localStorage.getItem('ckeditor-license-key'),
    }
  }
}
