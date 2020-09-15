import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifiyOtpPage } from './verifiy-otp.page';

const routes: Routes = [
  {
    path: '',
    component: VerifiyOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifiyOtpPageRoutingModule {}
