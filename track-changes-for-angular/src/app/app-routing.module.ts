import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoadSaveIntegrationComponent } from './load-save-integration/load-save-integration.component'
import { MenuComponent } from './menu/menu.component'
import { TrackChangesAdapterComponent } from './track-changes-adapter/track-changes-adapter.component'

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'load-save-integration', component: LoadSaveIntegrationComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
