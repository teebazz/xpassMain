import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkBvnPageRoutingModule } from './link-bvn-routing.module';

import { LinkBvnPage } from './link-bvn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkBvnPageRoutingModule
  ],
  declarations: [LinkBvnPage]
})
export class LinkBvnPageModule {}
