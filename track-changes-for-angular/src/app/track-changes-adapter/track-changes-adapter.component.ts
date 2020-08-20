import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { CKEditor5 } from '@ckeditor/ckeditor5-angular'

import * as ClassicEditorWithTrackChanges from '../../../vendor/ckeditor5/build/classic-editor-with-track-changes.js'
import { initialData } from './data'
import { getTrackChangesAdapter } from './track-changes-adapter'

@Component({
  selector: 'app-track-changes-adapter',
  templateUrl: './track-changes-adapter.component.html',
  styleUrls: ['./track-changes-adapter.component.css'],
})
export class TrackChangesAdapterComponent implements OnDestroy {
  @Input() control: FormControl
  @Output() ready = new EventEmitter<CKEditor5.Editor>()

  editorBuild = ClassicEditorWithTrackChanges
  editor?: CKEditor5.Editor

  private boundCheckPendingActions = this.checkPendingActions.bind(this)

  constructor() {}

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.boundCheckPendingActions)
  }

  onReady(editor: CKEditor5.Editor): void {
    this.editor = editor
    this.ready.emit(editor)
    this.editor.execute('trackChanges')
    window.addEventListener('beforeunload', this.boundCheckPendingActions)
  }

  // TODO: Remove (only used for testing purposes)
  displayHtmlInConsole(): void {
    console.log(this.control.value)
  }

  private checkPendingActions(event: Event): void {
    // Prevents user from leaving page if there are pending actions
    const pendingActionsPlugin = this.editor.plugins.get('PendingActions')
    if (pendingActionsPlugin.hasAny) {
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
