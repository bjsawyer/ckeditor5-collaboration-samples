import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { CKEditor5 } from '@ckeditor/ckeditor5-angular'

import * as ClassicEditorWithTrackChanges from '../../../vendor/ckeditor5/build/classic-editor-with-track-changes.js'
import { initialData } from './data'
import { getTrackChangesAdapter } from './track-changes-adapter'

@Component({
  selector: 'app-track-changes-adapter',
  templateUrl: './track-changes-adapter.component.html',
  styleUrls: ['./track-changes-adapter.component.css'],
})
export class TrackChangesAdapterComponent implements OnInit, OnDestroy {
  @Input() intialHtml = ''
  @Output() ready = new EventEmitter<CKEditor5.Editor>()
  CustomEditorBuild = ClassicEditorWithTrackChanges
  editor?: CKEditor5.Editor
  private boundCheckPendingActions = this.checkPendingActions.bind(this)

  ngOnInit(): void {}

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.boundCheckPendingActions)
  }

  onReady(editor: CKEditor5.Editor): void {
    this.editor = editor
    this.ready.emit(editor)
    this.editor.execute('trackChanges') // Make the track changes mode the "default" state by turning it on right after the editor initializes.
    window.addEventListener('beforeunload', this.boundCheckPendingActions) // Prevent closing the tab when any action is pending.
  }

  private checkPendingActions(event: Event): void {
    if (this.editor.plugins.get('PendingActions').hasAny) {
      event.preventDefault()
      event.returnValue = true
    }
  }

  get editorConfig(): object {
    return {
      extraPlugins: [getTrackChangesAdapter(initialData)],
      licenseKey: window.localStorage.getItem('ckeditor-license-key'),
    }
  }
}
