import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController ,ToastController} from '@ionic/angular';
import {XpassService} from './services/xpass.service'
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    public xpassService : XpassService,
    private network: Network,
    public toastController: ToastController
  ) {
    this.initializeApp();
    this.network.onDisconnect().subscribe(() => {
      this.newtworkCheck();
    },(error) =>{
      console.log(error);      
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();      
    });
  }

  ngOnInit() {
    // this.navCtrl.navigateRoot("/test-paystack");
    // this.navCtrl.navigateRoot("/login");
    // this.navCtrl.navigateRoot("/transaction-confirm-page");
    if(!localStorage.getItem("login")) {
      this.navCtrl.navigateRoot("/login");
    }else{
      let loginData = JSON.parse(localStorage.getItem("login"));
      this.xpassService.loginData.next(loginData);  
      this.xpassService.token = localStorage.getItem("login_token");           
      this.navCtrl.navigateRoot("/");
    }
  }

  async newtworkCheck() {
    const toast = await this.toastController.create({
      message: 'Please check your network settings',
      duration: 2000
    });
    toast.present();
  }
}
