import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardPayPageRoutingModule } from './card-pay-routing.module';
import { Angular4PaystackModule } from 'angular4-paystack';

import { CardPayPage } from './card-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardPayPageRoutingModule,
    Angular4PaystackModule
  ],
  declarations: [CardPayPage]
})
export class CardPayPageModule {}
