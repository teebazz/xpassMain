import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPaystackPageRoutingModule } from './test-paystack-routing.module';

import { TestPaystackPage } from './test-paystack.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPaystackPageRoutingModule
  ],
  declarations: [TestPaystackPage]
})
export class TestPaystackPageModule {}
