import { CKEditorModule } from '@ckeditor/ckeditor5-angular'
import { EditorComponent } from './editor.component'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [EditorComponent],
  imports: [CKEditorModule],
  providers: [],
  bootstrap: [EditorComponent],
  exports: [EditorComponent],
})
export class EditorModule {}
