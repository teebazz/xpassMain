import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {XpassService} from '../services/xpass.service'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: [
    'tab1.page.scss'
  ]
})
export class Tab1Page implements OnInit {
  name : any;
  latestTransaction : any;
  latestTransactionLoader: any = true;
  latestTransactionMessage: any;
  customerWallet :  any = '...';
  bvn_status :  any ;
  pin_setup :  any ;
  constructor(public router : Router,public XpassService: XpassService) {}

  ngOnInit() {    
    console.log('ooo');      
  }
  ngOnDestroy() {
    console.log("Parent component destroyed")
  }
  
  ionViewWillEnter() {
    // console.log(this.XpassService.loginData);
    this.XpassService.loginData.subscribe((res : any)=>{     
      this.name = res.name;
      this.bvn_status = res.bvn_status;
      this.pin_setup = res.pin_setup;
    });       
    this.XpassService.latestTransactionList.subscribe((res: any) =>{      
      this.latestTransaction = res;                      
    }); 
    this.XpassService.myData.subscribe((data) => { 
      this.customerWallet = data;
      console.log(data);           
    });
  }
  gotoBills(){
    this.router.navigate(['tab2']);
  }
  gotoSendMoney(){
    this.router.navigate(['tab3']);
  }
  gotoAirtime(){
    this.router.navigate(['airtime-data']);
  }
  gotoFundWallet(){
    this.router.navigate(['fund-wallet']);
  }
  gotoShareEarn(){
    this.router.navigate(['share-earn']);
  }

  gotoTransaction(transaction){
    this.XpassService.transaction = transaction;
    this.router.navigate(['transaction-page']);
  }


}
