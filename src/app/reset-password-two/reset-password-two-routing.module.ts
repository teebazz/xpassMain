import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordTwoPage } from './reset-password-two.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordTwoPageRoutingModule {}
