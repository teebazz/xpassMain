import { Component, OnInit } from '@angular/core';
import { LoadingController,NavController} from '@ionic/angular';
import {XpassService} from '../services/xpass.service'
import {Router} from '@angular/router'
import {UtilitiesService} from '../services/utilities.service'
@Component({
  selector: 'app-reset-password-two',
  templateUrl: './reset-password-two.page.html',
  styleUrls: ['./reset-password-two.page.scss'],
})
export class ResetPasswordTwoPage implements OnInit {

  constructor(private loadingController: LoadingController,public xpassService : XpassService,private navCtrl: NavController,public router : Router,private UtilitiesService : UtilitiesService) { }

  ngOnInit() {
    
  }

  resetPassword(form) {
    this.UtilitiesService.presentLoading();
    let body ={
      password : form.value.password,
      password_confirmation : form.value.password_confirmation,
      token : this.xpassService.password_reset_token
    }
    console.log(body);    
    let resData;
    this.xpassService.resetPassword(body).subscribe( (data) => {
      resData = data;
    },
    (error) => {       
      this.UtilitiesService.errorBag('Reset Error',error.error.data);
      this.loadingController.dismiss();
    },
    // completed callback
    ()=>{
      console.log("Completed");
      this.loadingController.dismiss();  
      this.xpassService.verification_type = 'registration';    
      if(resData.data.is_account_verified != 'yes'){
        this.router.navigate(['verify-otp']);
      }else{     
        console.log(resData.data);
        this.xpassService.loginData.next(resData.data);
        localStorage.setItem("login", JSON.stringify(resData.data));
        localStorage.setItem("login_token",(resData.data.auth_token));
        this.xpassService.token = resData.data.auth_token;
        this.navCtrl.navigateRoot("/");
      }
      //setting logindata on dataservice to resdata from user login      
    })
  }

}
