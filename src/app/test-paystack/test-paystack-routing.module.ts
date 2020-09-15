import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestPaystackPage } from './test-paystack.page';

const routes: Routes = [
  {
    path: '',
    component: TestPaystackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestPaystackPageRoutingModule {}
