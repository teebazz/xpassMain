import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordTwoPageRoutingModule } from './reset-password-two-routing.module';

import { ResetPasswordTwoPage } from './reset-password-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordTwoPageRoutingModule
  ],
  declarations: [ResetPasswordTwoPage]
})
export class ResetPasswordTwoPageModule {}
