import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service'
import { LoadingController,NavController} from '@ionic/angular';
import {Router} from '@angular/router'
import {UtilitiesService} from '../services/utilities.service'


@Component({
  selector: 'app-reset-password-one',
  templateUrl: './reset-password-one.page.html',
  styleUrls: ['./reset-password-one.page.scss'],
})
export class ResetPasswordOnePage implements OnInit {

  constructor(private loadingController: LoadingController,public xpassService : XpassService,private navCtrl: NavController, public router : Router,private UtilitiesService : UtilitiesService) { }

  ngOnInit() {
  }


  forgetPassword(form) {
    this.UtilitiesService.presentLoading();
    let body = {
      email : form.value.email,
    };
    console.log(body);
    
    let resData;
    this.xpassService.forgetPassword(body).subscribe( (data) => {
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
        this.xpassService.verification_type = 'reset-password'; 
        this.xpassService.email = form.value.email; 
        // sets token in dataservice
        this.router.navigate(['verify-otp']);
      }
      //setting logindata on dataservice to resdata from user login      
    );
  }

}
