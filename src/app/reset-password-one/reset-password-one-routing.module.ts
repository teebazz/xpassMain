import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordOnePage } from './reset-password-one.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordOnePageRoutingModule {}
