import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PinSetupPage } from './pin-setup.page';

const routes: Routes = [
  {
    path: '',
    component: PinSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinSetupPageRoutingModule {}
