import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareEarnPage } from './share-earn.page';

const routes: Routes = [
  {
    path: '',
    component: ShareEarnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareEarnPageRoutingModule {}
