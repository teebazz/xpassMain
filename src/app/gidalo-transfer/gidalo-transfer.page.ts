import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service'
import { LoadingController,NavController, AlertController} from '@ionic/angular';
import {UtilitiesService} from '../services/utilities.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-gidalo-transfer',
  templateUrl: './gidalo-transfer.page.html',
  styleUrls: ['./gidalo-transfer.page.scss'],
})
export class GidaloTransferPage implements OnInit {

  constructor(public xpassService: XpassService,private loadingController: LoadingController,public navCtrl : NavController, private UtilitiesService : UtilitiesService, public alertController : AlertController,private router : Router) { }

  ngOnInit() {
  }

  initateGidaloTransfer(form){
    let body = form.value;
    console.log(body);
    this.UtilitiesService.presentLoading();
    let resData;
    this.xpassService.initiateGidaloTransfer(body).subscribe((data) => {
      this.loadingController.dismiss();
      console.log(data);      
      this.presentAlertPrompt(data.response_message,data.data,body.amount);
      resData = data.data;
      // console.log(data);
    },
      (error) => {
        this.loadingController.dismiss();
        this.UtilitiesService.errorBag('Fund Error',error.error.data);
        console.log(error);
      },
      //completed callback
      () => {
        
      
      })
  }

  async presentAlertPrompt(msg,transaction,amount) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: msg,
      inputs: [
        {
          name: 'pin',
          type: 'password',
          placeholder: 'Enter your Pin',
          attributes: {
            maxlength: 4,
          }
        },        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: (pin) => {
            this.finalizeTransaction(pin.pin,transaction,amount);
          }
        }
      ]
    });
    await alert.present();
  }

  finalizeTransaction(pin,transaction,amount){
    let body = {
      pin : pin,
      user_id : transaction.id,
      amount : amount
    };
    console.log(body);
    this.UtilitiesService.presentLoading();
    let resData;
    this.xpassService.finalizeGidaloTransfer(body).subscribe((data) => {
      this.loadingController.dismiss();
      console.log(data);      
      this.UtilitiesService.errorBag('Transfer Alert',data.response_message);
      resData = data.data;
      this.router.navigateByUrl("/tabs/tab1");
      // console.log(data);
    },
      (error) => {
        this.loadingController.dismiss();
        this.UtilitiesService.errorBag('Transfer Error',error.error.data);
        console.log(error);
      },
      //completed callback
      () => {
        
      
      })
  }

}
