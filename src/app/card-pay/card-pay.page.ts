import { Component, OnInit } from '@angular/core';
import { XpassService } from '../services/xpass.service';
import { LoadingController, NavController } from '@ionic/angular';
import {Router} from '@angular/router'

@Component({
    selector: 'app-card-pay',
    templateUrl: './card-pay.page.html',
    styleUrls: ['./card-pay.page.scss'],
})
export class CardPayPage implements OnInit {
    transaction: any;
    paystack_pk: any;
    loginData: any;
    email: any;
    amount: any;
    constructor(public XpassService: XpassService, private loadingController: LoadingController, public navCtrl: NavController,public router : Router,) { }

    ngOnInit() {
        this.paystack_pk = 'pk_test_2943cd8d7fd75b96838021df85834d56ebe0339f';
        this.transaction = this.XpassService.transaction;
        this.XpassService.loginData.subscribe(res =>{
            this.email = res.email
        });
        console.log(this.transaction);
        this.amount = this.transaction.transaction.payable_amount * 100;
    }

    Loader: boolean = false;
    // loading notification when login is clicked
    async presentLoading() {
        this.Loader = true;
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            // duration: 2000
        });
        await loading.present();
        const { role, data } = await loading.onDidDismiss();
        this.Loader = false; //set back to false onDismiss
        console.log('Loading dismissed!');
    }

    ionViewDidEnter() {
        // let clk = document.getElementById('payBtn') as HTMLButtonElement;
        // clk.click();
    }

    alertHeader: string;
    alertMessage: string;
    paymentDone(ref: any) {
        let walletData = {
            reference: ref.reference
        };
        console.log(walletData);
        this.presentLoading();
        let resData;
        this.XpassService.finalizeWallet(walletData).subscribe((data) => {
            resData = data.data;
            this.XpassService.cusBalance = '90';
            this.loadingController.dismiss();
            console.log(data)
        },
            (error) => {
                this.loadingController.dismiss();
                this.alertHeader = "Fund Error";
                this.alertMessage = error.error.data[0];
                this.XpassService.presentAlert(this.alertHeader, this.alertMessage)
                console.log(error);
            },
            //completed callback
            () => {
                // this.XpassService.transaction = resData;
                this.loadingController.dismiss();
                console.log("Completed");
                // this.XpassService.cusBalance = '90';
                this.XpassService.presentAlert('Fund Alert', 'Your wallet was funded successfully');
                this.XpassService.customerWallet();
                this.router.navigateByUrl("/tabs/tab1");
            })

    }

    //Event triggered if User cancel the payment
    paymentCancel(ref: any) {
        console.log('payment failed');
        this.navCtrl.pop();
    }
    paymentCancelc() {
        console.log('payment failed..........');
        // this.navCtrl.pop();
    }

}
