import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service'
import { LoadingController,NavController} from '@ionic/angular';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';
import {Router} from '@angular/router'
import {UtilitiesService} from '../services/utilities.service'

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.page.html',
  styleUrls: ['./fund-wallet.page.scss'],
})
export class FundWalletPage implements OnInit {

  constructor(public xpassService: XpassService,private loadingController: LoadingController,public navCtrl : NavController,private iab: InAppBrowser, private router : Router,private UtilitiesService : UtilitiesService) {

  }

  ngOnInit() {
  }
  initateWalletfund(form){
    let body = form.value;
    console.log(body);
    this.UtilitiesService.presentLoading();
    let resData;
    this.xpassService.initiateWallet(body).subscribe((data) => {
      resData = data.data;
      console.log(data)
    },
      (error) => {
        this.loadingController.dismiss();
        this.UtilitiesService.errorBag('Fund Error',error.error.data);
        console.log(error);
      },
      //completed callback
      () => {
        // this.xpassService.transaction = resData;
        // this.loadingController.dismiss();
        // console.log("Completed");
        // this.navCtrl.navigateForward("card-pay");
        let browser = null;
        browser = this.iab.create(resData.auth_url, '_blank', { hardwareback: 'no', location: 'yes'});
        browser.on("exit").subscribe((res: InAppBrowserEvent) => {
            // this.loadingController.dismiss();
          }, err => {
            // this.loadingController.dismiss();
          }
        );

        browser.on("loadstart").subscribe(
          (res: InAppBrowserEvent) => {
            if(res.url.startsWith("https://mysite.com/api/api-proceed-to-order")){
              browser.close();
              var resp = this.getQueryParam(res.url, 'trxref');;              
              this.UtilitiesService.presentLoading();
              this.paymentDone(resp);
            }else{
              this.loadingController.dismiss();
            }
          }, err => {
            this.loadingController.dismiss();
          }
        );
      
      })
    
  }

  getQueryParam(url,param) {
    var result = url.match(
        new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
    );
    return result ? result[3] : false;
  }
  paymentDone(ref: any) {
    let walletData = {
        reference: ref
    };
    console.log(walletData);    
    let resData;
    this.xpassService.finalizeWallet(walletData).subscribe((data) => {
        resData = data.data;
        this.loadingController.dismiss();
        console.log(data)
    },
        (error) => {
            this.loadingController.dismiss();
            this.UtilitiesService.errorBag('Fund Error',error.error.data);
            console.log(error);
        },
        //completed callback
        () => {
            this.loadingController.dismiss();
            this.UtilitiesService.errorBag('Fund Alert','Your wallet was funded successfully');
            this.xpassService.customerWallet();
            this.router.navigateByUrl("/tabs/tab1");
        })

}
}
