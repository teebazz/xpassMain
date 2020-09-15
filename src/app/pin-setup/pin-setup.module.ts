import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PinSetupPageRoutingModule } from './pin-setup-routing.module';

import { PinSetupPage } from './pin-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PinSetupPageRoutingModule
  ],
  declarations: [PinSetupPage]
})
export class PinSetupPageModule {}
