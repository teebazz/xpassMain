import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { XpassService } from '../services/xpass.service'
import {UtilitiesService} from '../services/utilities.service'
import { Router } from '@angular/router'
import { TouchID } from '@ionic-native/touch-id/ngx';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  fingerprintOptions: FingerprintOptions;
  constructor(private loadingController: LoadingController, public xpassService: XpassService, private navCtrl: NavController, public router: Router, private touchId: TouchID, private fingerAuth: FingerprintAIO, private UtilitiesService : UtilitiesService) { }
  email: any = localStorage.getItem('email');
  ngOnInit() {
  }

  fingerLogin() {
    this.fingerprintOptions = {
      title: 'Biometric Authentication', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
      disableBackup: false,  // optional | default: false
    }
    if (localStorage.getItem('log_credentials') == null || localStorage.getItem('log_credentials') == ''|| localStorage.getItem('log_credentials') == undefined) {
      this.UtilitiesService.presentAlert('Login Error', 'Please login to your account first');
    } else {
      this.fingerAuth.isAvailable().then(result => {
        this.fingerAuth.show(this.fingerprintOptions)
          .then((result: any) => {
            let body = JSON.parse(localStorage.getItem('log_credentials'))
            this.logFunction(body);
          })
          .catch((error: any) => console.log(error));
      }).catch(error => {
        this.UtilitiesService.presentAlert('Login Error', error);
      });
    }

  }

  login(form) {
    let body = form.value;
    console.log(form.value);
    this.logFunction(body);
  }

  logFunction(body) {
    this.UtilitiesService.presentLoading();
    let resData; //to hold response data
    this.xpassService.login(body).subscribe((data) => {
      resData = data;
      console.log(data);
    },
      (error) => {
        this.UtilitiesService.errorBag('Login Error',error.error.data);
        this.loadingController.dismiss();
      },
      // completed callback
      () => {
        console.log("Completed");
        this.loadingController.dismiss();
        this.xpassService.email = resData.data.email;
        this.xpassService.verification_type = 'registration';
        if (resData.data.is_account_verified != 'yes') {
          this.router.navigate(['verify-otp']);
        } else {
          // sets token in dataservice
          this.xpassService.loginData.next(resData.data);
          localStorage.setItem("email", resData.data.email);
          localStorage.setItem("log_credentials", JSON.stringify(body));
          localStorage.setItem("login", JSON.stringify(resData.data));
          localStorage.setItem("login_token", (resData.data.auth_token));
          this.xpassService.token = resData.data.auth_token;
          this.navCtrl.navigateRoot("/");
        }
        //setting logindata on dataservice to resdata from user login      
      })
  }

  gotoHome() {
    this.navCtrl.navigateRoot("/");
  }




}
