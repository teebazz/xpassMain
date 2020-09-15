import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service';
import { LoadingController,NavController} from '@ionic/angular';
import {UtilitiesService} from '../services/utilities.service'

@Component({
  selector: 'app-link-bvn',
  templateUrl: './link-bvn.page.html',
  styleUrls: ['./link-bvn.page.scss'],
})
export class LinkBvnPage implements OnInit {

  constructor(public xpassService: XpassService,private loadingController: LoadingController,public navCtrl : NavController, private UtilitiesService : UtilitiesService) { }

  ngOnInit() {
  }

  verifyBVN(form){
    let body = form.value;
    console.log(body);
    this.UtilitiesService.presentLoading();
    let resData;
    this.xpassService.verifyBVN(body).subscribe((data) => {
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
        this.xpassService.loginData.next(resData.data);
        localStorage.setItem("login", resData.data);
        this.UtilitiesService.errorBag('Success Alert',resData.response_message);       
        this.navCtrl.navigateRoot("/");    
      })
    
  }

}
