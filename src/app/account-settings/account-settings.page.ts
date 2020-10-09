import { Component, OnInit } from '@angular/core';
import { LoadingController,NavController} from '@ionic/angular';
import {XpassService} from '../services/xpass.service'
import {Router} from '@angular/router'
import {UtilitiesService} from '../services/utilities.service'
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {
  first_name : any;
  last_name : any;
  phone_number : any;
  email : any;
  constructor(private loadingController: LoadingController,public XpassService : XpassService,private navCtrl: NavController, public router : Router, private UtilitiesService : UtilitiesService) { }

  ngOnInit() {
    this.XpassService.loginData.subscribe((res : any)=>{ 
      console.log(res);      
      this.first_name = res.first_name;
      this.last_name = res.last_name;
      this.email = res.email;
      this.phone_number = res.phone_number;
    });
  }

  updateProfile(form){
    let body = form.value;
    console.log(body);
    this.UtilitiesService.presentLoading();
    let resData;
    this.XpassService.updateProfileRemote(body).subscribe((data) => {
      resData = data;
    },
      (error) => {
        this.loadingController.dismiss();
        this.UtilitiesService.errorBag('Link Error',error.error.data);
        console.log(error);
      },
      //completed callback
      () => {
        this.loadingController.dismiss();
        this.XpassService.loginData.next(resData.data);
        localStorage.setItem("login", resData.data);
        this.UtilitiesService.errorBag('Success Alert',resData.response_message);       
        // this.navCtrl.navigateRoot("/");    
      })
  }

}
