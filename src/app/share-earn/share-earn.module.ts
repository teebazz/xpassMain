import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareEarnPageRoutingModule } from './share-earn-routing.module';

import { ShareEarnPage } from './share-earn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareEarnPageRoutingModule
  ],
  declarations: [ShareEarnPage]
})
export class ShareEarnPageModule {}
