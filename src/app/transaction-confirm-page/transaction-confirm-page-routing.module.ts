import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionConfirmPagePage } from './transaction-confirm-page.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionConfirmPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionConfirmPagePageRoutingModule {}
