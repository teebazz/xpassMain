import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service'
import { LoadingController,NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import {UtilitiesService} from '../services/utilities.service';


@Component({
  selector: 'app-verifiy-otp',
  templateUrl: './verifiy-otp.page.html',
  styleUrls: ['./verifiy-otp.page.scss'],
})
export class VerifiyOtpPage implements OnInit {
  email :  any;
  title :  any;
  description :  any;
  constructor(private loadingController: LoadingController,public xpassService : XpassService,private navCtrl: NavController, public router : Router,private UtilitiesService : UtilitiesService) { }
  ngOnInit() {
    this.email = this.xpassService.email;
    if(this.xpassService.verification_type == 'registration'){
      this.title = "Device Verification";
      this.description = "Enter the 6-digit confirmation code sent to email";
    }else if(this.xpassService.verification_type == 'reset-password'){
      this.title = "Password Reset";
      this.description = "Enter the 6-digit confirmation code sent to email";
    }
  }
  

  verifyOtp(form) {
    this.UtilitiesService.presentLoading();
    let body = {
      otp : form.value.otp,
      email : this.email,
      type : this.xpassService.verification_type,
    };
    console.log(body);
    
    let resData;
    this.xpassService.verifyToken(body).subscribe( (data) => {
      resData = data;
    },
    (error) => {       
      this.UtilitiesService.errorBag('Reset Error',error.error.data);
      this.loadingController.dismiss();
    },
    // completed callback
    ()=>{
        this.loadingController.dismiss();
        console.log("Completed");
        // sets token in dataservice
        if(this.xpassService.verification_type == 'registration'){
          this.xpassService.loginData.next(resData.data);
          localStorage.setItem("login", JSON.stringify(resData.data));
          localStorage.setItem("login_token",(resData.data.auth_token));
          this.xpassService.token = resData.data.auth_token;
          this.navCtrl.navigateRoot("/"); 
        }else if(this.xpassService.verification_type == 'reset-password'){
          this.xpassService.password_reset_token = resData.data.password_reset_token;
          this.router.navigate(['/reset-password-two']);
          
        }
      }
      //setting logindata on dataservice to resdata from user login      
    );
  }
  resendOtp() {
    this.UtilitiesService.presentLoading();
    let body = {
      email : this.email,
      type : this.xpassService.verification_type,
    };
    console.log(body);
    
    let resData; //to hold response data
    // console.log(form.value);
    this.xpassService.resendToken(body).subscribe( (data) => {
      resData = data;
    },
    (error) => {       
      this.UtilitiesService.errorBag('Reset Error',error.error.data);
      this.loadingController.dismiss();
    },
    // completed callback
    ()=>{
        this.loadingController.dismiss();
        console.log("Completed");
        this.UtilitiesService.errorBag('OTP Alert',resData.response_message);
      }
      //setting logindata on dataservice to resdata from user login      
    );
  }

}
