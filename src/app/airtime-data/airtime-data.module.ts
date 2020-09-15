import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirtimeDataPageRoutingModule } from './airtime-data-routing.module';

import { AirtimeDataPage } from './airtime-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AirtimeDataPageRoutingModule
  ],
  declarations: [AirtimeDataPage]
})
export class AirtimeDataPageModule {}
