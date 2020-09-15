import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifiyOtpPageRoutingModule } from './verifiy-otp-routing.module';

import { VerifiyOtpPage } from './verifiy-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifiyOtpPageRoutingModule
  ],
  declarations: [VerifiyOtpPage]
})
export class VerifiyOtpPageModule {}
