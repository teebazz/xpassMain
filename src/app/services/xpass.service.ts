import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {AlertController, NavController,LoadingController}  from '@ionic/angular';

import * as Rx from "rxjs";
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {UtilitiesService} from '../services/utilities.service'

@Injectable({
  providedIn: 'root'
})
export class XpassService {
  // base_url : any = 'http://xpass.test/api/';
  base_url : any = 'http://142.93.121.56/api/';
  // base_url : any = 'https://4277453b64cd.ngrok.io/api/';
  services : any;
  navData: any;   //to pass data across pages when navigating pages
  transaction: any;   //to pass data across pages when navigating pages
  token;  //user token
  firstUse: any = false;
  verification_type: any = false;
  email: any ;
  password_reset_token: any = false;
  // loginData: any = false;
  cusBalance :  any = '1000';
  public myData : any = new BehaviorSubject<any>('...');
  public latestTransactionList : any = new BehaviorSubject<any>([]);
  public latestTransactionAllList : any = new BehaviorSubject<any>([]);
  public bankListArray : any = new BehaviorSubject<any>([]);
  public bankRecipientArray : any = new BehaviorSubject<any>([]);
  public loginData : any = new BehaviorSubject<any>({});
  constructor(private http: HttpClient, public alert : AlertController, public navCtrl :NavController, public UtilitiesService : UtilitiesService ,private loadingController: LoadingController) { }
  getPayBills(category) {
    return new Promise((resolve) => {
      this.http.get(`${this.base_url}service/get-services-by-category-grouped?category_ids=${category}`).subscribe((response) => {
        resolve(response);
      });
    }); 
  }

  register(body) {
    return this.http.post<any>( `${this.base_url}create-new-user`, body );
  }

  logout() {
    this.loginData.next({});
    this.token = false;
    localStorage.removeItem("login");
    // localStorage.removeItem("log_credentials");
    this.navCtrl.navigateRoot("/login");
    this.latestTransactionList.next([]);
    this.myData.next('...');
  }

  login(body) {
    return this.http.post<any>( `${this.base_url}login-customer`, body );
  }
  
  verifyToken(body) {
    return this.http.post<any>( `${this.base_url}validate-otp`, body );
  }

  
  forgetPassword(body) {
    return this.http.post<any>( `${this.base_url}forget-password`, body );
  }

  resetPassword(body) {
    return this.http.post<any>( `${this.base_url}reset-password`, body );
  }

  resendToken(body) {
    return this.http.post<any>( `${this.base_url}resend-otp`, body );
  }

  verifyBVN(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}user/verify-bvn`, body ,{headers});
  }

  createPin(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}user/setup-pin`, body ,{headers});
  }

  updatePin(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}user/update-pin`, body ,{headers});
  }

  updatePassword(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}user/update-password`, body ,{headers});
  }

  initiateServiceTransaction(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}service/create-transaction`, body ,{headers});
  }

  initiateGidaloTransfer(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}transaction/transfer-to-gidalo`, body ,{headers});
  }

  finalizeGidaloTransfer(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}transaction/finalize-transfer-to-gidalo`, body ,{headers});
  }

  initiateFundsTransfer(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}transaction/initiate-funds-transfer`, body ,{headers});
  }
  
  finalizieServiceTransaction(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}transaction/process-transaction`, body ,{headers});
  }

  initiateWallet(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}transaction/inititate-wallet-load`, body ,{headers});
  }

  finalizeWallet(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);
    
    return this.http.post<any>( `${this.base_url}transaction/finalize-wallet-load`, body ,{headers});
  }
  
  latestTransaction() {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    this.http.get<any>( `${this.base_url}transaction/latest-transactions` ,{headers}).subscribe((response) => {
      this.latestTransactionList.next(response.data);
    });
  }

  latestTransactionAll() {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    this.http.get<any>( `${this.base_url}transaction/latest-transactions-all` ,{headers}).subscribe((response) => {
      this.latestTransactionAllList.next(response.data);
    });
  }

  customerWallet() {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    return this.http.get<any>( `${this.base_url}user/customer-wallet` ,{headers}).subscribe((response) => {
      this.myData.next(response.data);
    })
  }

  bankList() {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    this.http.get<any>( `${this.base_url}transfer/get-banks` ,{headers}).subscribe((response) => {
      this.bankListArray.next(response.data);
    });
  }
  
  bankRecipientArrayList() {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    this.http.get<any>( `${this.base_url}user/get-bank-recipients` ,{headers}).subscribe((response) => {
      console.log(response.data);      
      this.bankRecipientArray.next(response.data);
    });
  }

  initWallet(){
    return new Promise((resolve) => {
      const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
      this.http.get<any>( `${this.base_url}user/customer-wallet` ,{headers}).subscribe((response) => {
        resolve(response);
      });
    });
  }

  async presentAlert(header, message) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  getAccountNumber(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}transfer/get-bank-account-details`, body ,{headers});
  }

  updateProfileRemote(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}user/update-profile`, body ,{headers});
  }


  generateReceipt(body) {
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    console.log(headers);    
    return this.http.post<any>( `${this.base_url}transaction/generate-receipt`, body ,{headers});
  }

  updateUserInstance(userInstance){
    localStorage.setItem("login", JSON.stringify(userInstance));
    this.loginData.next(userInstance);
  }


  getGidaloAccountNumber() {
    this.UtilitiesService.presentLoading('Generating Account Number');
    const headers = new HttpHeaders( { 'Authorization': `Bearer ${this.token}`});
    return this.http.get<any>( `${this.base_url}user/get-account-number` ,{headers}).subscribe((response) => {
      this.loginData.next(response.data); 
      if(response.data.account_number_setup == 'yes'){
        this.UtilitiesService.presentAlert('Alert', 'Your Account was Generated Successfully');
      }      
      this.loadingController.dismiss();     
    },
    (error) =>{
      console.log(error); 
      this.loadingController.dismiss();
    },
    () =>{
      
    }
    
    )
  }
}
