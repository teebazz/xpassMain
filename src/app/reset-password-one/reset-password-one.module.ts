import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordOnePageRoutingModule } from './reset-password-one-routing.module';

import { ResetPasswordOnePage } from './reset-password-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordOnePageRoutingModule
  ],
  declarations: [ResetPasswordOnePage]
})
export class ResetPasswordOnePageModule {}
