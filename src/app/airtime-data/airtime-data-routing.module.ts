import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirtimeDataPage } from './airtime-data.page';

const routes: Routes = [
  {
    path: '',
    component: AirtimeDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirtimeDataPageRoutingModule {}
