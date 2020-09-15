import { Component } from '@angular/core';
import { XpassService } from '../services/xpass.service'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  bankList: any;
  bankRecipientList: any;
  recipient_id:any;
  service: any;
  account_loader : true;
  gt_show: any;
  amount: any;
  bank_id: any;
  account_name: any;
  account_number: any;
  save_beneficiary: any;
  amountReadOnly: any = false;
  public formPay: FormGroup;
  constructor(public XpassService: XpassService, public router: Router, public formBuilder: FormBuilder, private loadingController: LoadingController, public navCtrl: NavController) {
    this.formPay = this.formBuilder.group({
      amount: ['', Validators.required],
      account_number: ['', Validators.required],
      bank_id: ['', Validators.required],
      account_name: [''],
      save_beneficiary: [''],
      recipient_id : ['']
    });
  }

  ionViewWillEnter() {
    this.XpassService.bankListArray.subscribe((res: any) => {
      this.bankList = res;
      console.log(this.bankList);
    });
    this.XpassService.bankRecipientArray.subscribe((res: any) => {
      this.bankRecipientList = res;
    });
  }
  alertHeader: string;
  alertMessage: string;
  getAccount(accountNumber) {
    console.log(accountNumber.detail.value);
    this.gt_show = false;
    if (accountNumber.detail.value.length > 9) {
      if (this.bank_id == undefined || this.bank_id == '') {
        this.XpassService.presentAlert('Alert', 'Please Select Your Recipient Bank');
      } else {
        this.gt_show = true;
        let body = {
          account_number: accountNumber.detail.value,
          bank_id: this.bank_id.id,
        };
        console.log(body);
        
        let resData;
        this.XpassService.getAccountNumber(body).subscribe((data) => {
          resData = data.data;
          this.gt_show = false;
          console.log(data);
        },
          (error) => {
            this.gt_show = false;
            this.alertHeader = "Alert";
            this.alertMessage = error.error.data;
            this.XpassService.presentAlert(this.alertHeader, this.alertMessage)
            console.log(error);
          },
          //completed callback
          () => {
            this.account_name = (resData);
            // alert message
          })
      }
    }
  }

  putBeneficiary(event){
    console.log(event);
    this.recipient_id =  {
      id : '',
      name : ''
    };
    this.bank_id = event.value.bank;
    this.account_name = event.value.recipient;
    this.account_number = event.value.account_number;
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

  initateTransaction(form) {
    console.log(form.value);
    if (!this.formPay.valid) {
      if (this.formPay.controls.bank_id.hasError('required')) {
        this.alertMessage = `Recipient Bank is required`;
      } else if (this.formPay.controls.account_number.hasError('required')) {
        this.alertMessage = `Account Number is required`;
      } else if (this.formPay.controls.amount.hasError('required')) {
        this.alertMessage = `Amount is required`;
      } else{
        this.alertHeader = "";
        this.XpassService.presentAlert(this.alertHeader, this.alertMessage);
      }

    } else {
      let body = {
        account_number: this.account_number,
        bank_id: this.bank_id.id,
        amount: this.amount,
        save_beneficiary : this.save_beneficiary
      }
      console.log(body);
      let resData;
      this.presentLoading();
      this.XpassService.initiateFundsTransfer(body).subscribe((data) => {
        this.loadingController.dismiss();
        resData = data.data;
        console.log(data);
      },
        (error) => {
          this.loadingController.dismiss();
          this.alertHeader = "Fund Error";
          this.alertMessage = error.error.data;
          this.XpassService.presentAlert(this.alertHeader, this.alertMessage)
          console.log(error);
        },
        //completed callback
        () => {
          this.XpassService.transaction = resData;
          console.log("Completed");
          // switch segment back to login by calling the segment function
          this.XpassService.transaction = resData;
          this.router.navigate(['transaction-page']);
          // alert message
        })
    }

  }

}
