import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {XpassService} from '../services/xpass.service';
import { LoadingController, NavController,AlertController } from '@ionic/angular';
import {Router} from '@angular/router'
import {UtilitiesService} from '../services/utilities.service'

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.page.html',
  styleUrls: ['./transaction-page.page.scss'],
})
export class TransactionPagePage implements OnInit {

  constructor(public xpassService : XpassService,private loadingController: LoadingController, public navCtrl: NavController, public router : Router,private platform: Platform,public alertController : AlertController,private UtilitiesService : UtilitiesService) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
    });
  }
  transaction : any;
  ngOnInit() {
    this.transaction = this.xpassService.transaction;
    console.log(this.transaction);    
  }

  alertHeader:any;
  alertMessage:any;
  finalizeTransaction(pin,transaction){  
    console.log(pin);    
    if(pin == "" || pin ==  undefined || pin ==  null){
      this.UtilitiesService.presentAlert('Pin Error', 'Transaction Pin is Empty');
    }else{
      this.UtilitiesService.presentLoading();
      let body  = {
        reference : transaction.transaction.reference,
        pin : pin
      }
      let resData;
      this.xpassService.finalizieServiceTransaction(body).subscribe((data) => {
        resData = data;
        console.log(data);
      },
        (error) => {
          this.loadingController.dismiss();
          this.UtilitiesService.errorBag('Transaction Alert',error.error.data);
          console.log(error);
        },
        //completed callback
        () => {
          this.loadingController.dismiss();
          this.xpassService.transaction = resData;        
          console.log("Completed");
          // switch segment back to login by calling the segment function
          this.xpassService.transaction = resData.data;
          this.loadingController.dismiss();
          this.navCtrl.navigateRoot("/transaction-confirm-page");
      })
    // console.log(body);
    }    
    
  }

  async presentAlertPrompt(transaction) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Transaction',
      inputs: [
        {
          name: 'pin',
          type: 'password',
          placeholder: 'Enter your Transcaction Pin',
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
            this.finalizeTransaction(pin.pin,transaction);
          }
        }
      ]
    });

    await alert.present();
  }

}
