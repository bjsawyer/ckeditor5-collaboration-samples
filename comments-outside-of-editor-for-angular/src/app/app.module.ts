import { AppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { EditorModule } from './editor/editor.module'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, EditorModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
