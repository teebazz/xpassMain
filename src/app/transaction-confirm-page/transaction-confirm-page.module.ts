import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionConfirmPagePageRoutingModule } from './transaction-confirm-page-routing.module';

import { TransactionConfirmPagePage } from './transaction-confirm-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionConfirmPagePageRoutingModule
  ],
  declarations: [TransactionConfirmPagePage]
})
export class TransactionConfirmPagePageModule {}
