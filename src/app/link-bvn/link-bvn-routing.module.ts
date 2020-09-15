import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkBvnPage } from './link-bvn.page';

const routes: Routes = [
  {
    path: '',
    component: LinkBvnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkBvnPageRoutingModule {}
