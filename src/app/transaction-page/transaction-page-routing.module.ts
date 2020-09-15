import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionPagePage } from './transaction-page.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionPagePageRoutingModule {}
