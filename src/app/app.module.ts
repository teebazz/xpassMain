import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { NgxCurrencyModule } from "ngx-currency";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientJsonpModule,
    IonicSelectableModule,
    Angular4PaystackModule.forRoot(''),
    NgxCurrencyModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Clipboard,
    Contacts,
    File,
    FingerprintAIO,
    FileTransfer,
    PDFGenerator,
    TouchID,
    SocialSharing,
    FileOpener,
    Network,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
