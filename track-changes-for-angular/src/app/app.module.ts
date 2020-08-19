import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoadSaveIntegrationComponent } from './load-save-integration/load-save-integration.component'
import { MenuComponent } from './menu/menu.component'
import { TrackChangesAdapterComponent } from './track-changes-adapter/track-changes-adapter.component'

@NgModule({
  declarations: [
    AppComponent,
    TrackChangesAdapterComponent,
    LoadSaveIntegrationComponent,
    MenuComponent,
  ],
  imports: [BrowserModule, CKEditorModule, RouterModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
