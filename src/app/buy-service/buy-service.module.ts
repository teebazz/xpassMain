import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';
import { BuyServicePageRoutingModule } from './buy-service-routing.module';

import { BuyServicePage } from './buy-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    BuyServicePageRoutingModule
  ],
  declarations: [BuyServicePage]
})
export class BuyServicePageModule {}
