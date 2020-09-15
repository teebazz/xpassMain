import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-test-paystack',
  templateUrl: './test-paystack.page.html',
  styleUrls: ['./test-paystack.page.scss'],
})
export class TestPaystackPage implements OnInit {

  cardNumber: string='4084084084084081';
  expiryMM:any='11';
  expiryYY:any='2018';
  cvc:any='408';
  constructor(private platform: Platform,) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      (<any>window).window.PaystackPlugin.chargeCard(
			  (resp)=>{
				console.log('charge successful: ', resp.reference);
				//this.api.postOrder(form).subscribe(res => {});
			  },(resp)=>{
				console.log('charge failed: '+this.cardNumber+", "+this.expiryMM+", "+this.expiryYY+", "+this.cvc+", "+resp);
			  },
			  {
				cardNumber: this.cardNumber, 
				expiryMonth: this.expiryMM, 
				expiryYear: this.expiryYY, 
				cvc: this.cvc,
				email: 'chargeIOS@master.dev',
				amountInKobo: 150000
			});
    });
  }

}
