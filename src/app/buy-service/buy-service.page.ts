import { Component, OnInit } from '@angular/core';
import { XpassService } from '../services/xpass.service';
import { Router } from '@angular/router'
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {UtilitiesService} from '../services/utilities.service'
import {
	Contacts,
	Contact,
	ContactName,
	ContactField,
} from '@ionic-native/contacts/ngx';

@Component({
  selector: 'app-buy-service',
  templateUrl: './buy-service.page.html',
  styleUrls: ['./buy-service.page.scss'],
})
export class BuyServicePage implements OnInit {
  service: any;
  amount: any;
  variation_code: any;
  biller_identifier: any;
  amountReadOnly: any = false;
  public formPay: FormGroup;
  constructor(public XpassService: XpassService, public router: Router, public formBuilder: FormBuilder, private loadingController: LoadingController, public navCtrl: NavController, private contacts: Contacts, public alertController: AlertController,private UtilitiesService : UtilitiesService) {
    this.formPay = this.formBuilder.group({
      amount: ['', Validators.required],
      biller_identifier: ['', Validators.required],
      variation_code: [''],
    });
  }

  ngOnInit() {
    this.service = this.XpassService.services;
    console.log(this.service);
  }


  alertHeader: string;
  alertMessage: string;

  getPrice(event) {
    // alert('ooo');
    console.log(event.value);
    this.service.variation_list.filter(obj => {
      // console.log(obj);
      if (event.value.id == obj.id) {
        this.amount = obj.amount;
      }

    })

  }

  async selectFromPhoneBook() {
    this.contacts.pickContact().then((Contact) => {
      if (Contact.phoneNumbers.length > 1) {
        let pnums = [];
        for (var i = 0; i < Contact.phoneNumbers.length; i++) {
          pnums.push({
            type: 'radio',
            name: 'phonen',
            label: Contact.phoneNumbers[i].value,
            value: Contact.phoneNumbers[i].value,
          });
        }
        return new Promise(async (resolve) => {
          const confirm = await this.alertController.create({
            header: 'confirm',
            message: 'my message',
            inputs: pnums,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  return resolve(false);
                },
              },
              {
                text: 'Use Number',
                handler: data => {
                  this.biller_identifier = data.replace(/\s/g, "").replace(/\+/g, "");
                }
              },
            ],
          });

          await confirm.present();
        });

      } else {
        this.biller_identifier = (Contact.phoneNumbers[0].value).replace(/\s/g, "").replace(/\+/g, "");
      }

    });
  }

  initateTransaction(form) {
    console.log(form.value);
    if (!this.formPay.valid) {
      if (this.service.variation_list.length > 0) {
        if (this.formPay.controls.variation_code.hasError('required')) {
          this.alertMessage = `${this.service.variation_label} is required`;
        }
      }
      if (this.formPay.controls.biller_identifier.hasError('required')) {
        this.alertMessage = `${this.service.biller_identifier_name} is required`;
      } else if (this.formPay.controls.amount.hasError('required')) {
        this.alertMessage = `Amount is required`;
      } else
      this.alertHeader = "";
      this.UtilitiesService.presentAlert('Service Error', this.alertMessage);
    } else {
      let body = {
        service_id: this.service.id,
        biller_identifier: this.biller_identifier,
        amount: this.amount,
        variation_id: this.variation_code.id
      }
      console.log(body);
      let resData;
      this.UtilitiesService.presentLoading();
      this.XpassService.initiateServiceTransaction(body).subscribe((data) => {
        this.loadingController.dismiss();
        resData = data.data;
        console.log(data);
      },
        (error) => {
          this.loadingController.dismiss();
          this.UtilitiesService.errorBag('Service Alert',error.error.data);
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

  getVariations(){
    alert('iii');
  }

}
