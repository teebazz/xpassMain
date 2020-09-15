import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPagePageRoutingModule } from './transaction-page-routing.module';

import { TransactionPagePage } from './transaction-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionPagePageRoutingModule
  ],
  declarations: [TransactionPagePage]
})
export class TransactionPagePageModule {}
