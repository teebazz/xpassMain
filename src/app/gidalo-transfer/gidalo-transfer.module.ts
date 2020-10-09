import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GidaloTransferPageRoutingModule } from './gidalo-transfer-routing.module';

import { GidaloTransferPage } from './gidalo-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GidaloTransferPageRoutingModule
  ],
  declarations: [GidaloTransferPage]
})
export class GidaloTransferPageModule {}
