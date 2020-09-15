import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service';
import { LoadingController,NavController} from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {UtilitiesService} from '../services/utilities.service'

@Component({
  selector: 'app-pin-setup',
  templateUrl: './pin-setup.page.html',
  styleUrls: ['./pin-setup.page.scss'],
})
export class PinSetupPage implements OnInit {
  pin_setup :  any ;
  public formPay: FormGroup;
  old_pin : any;
  pin : any;
  pin_confirmation : any;
  constructor(public XpassService: XpassService,private loadingController: LoadingController,public navCtrl : NavController,public formBuilder: FormBuilder,private UtilitiesService : UtilitiesService) {
    

   }
  ngOnInit(){
    this.XpassService.loginData.subscribe((res : any)=>{     
      this.pin_setup = res.pin_setup;
      if(this.pin_setup ==  'yes'){
        this.formPay = this.formBuilder.group({
          old_pin: ['', Validators.required],
          pin: ['', Validators.required],
          pin_confirmation: ['', Validators.required],
        }); 
      }else{
        this.formPay = this.formBuilder.group({
          pin: ['', Validators.required],
          pin_confirmation: ['', Validators.required],
        }); 
      }      
    }); 
  }
  ionViewDidEnter() {     
  }

  alertHeader: string;
  alertMessage: string;

  createPin(form){
    let body = form.value;
    console.log(body);    
    let resData;
    if (!this.formPay.valid) {
      if (this.formPay.controls.pin.hasError('required')) {
        this.alertMessage = `Pin is required`;
      } else if (this.formPay.controls.pin_confirmation.hasError('required')) {
        this.alertMessage = `Pin Confirmation is required`;
      } 
      this.UtilitiesService.errorBag('Pin Error',this.alertMessage);
    }else{
      this.UtilitiesService.presentLoading();
      this.XpassService.createPin(body).subscribe((data) => {
        resData = data;
        console.log(data)
      },
        (error) => {
          this.loadingController.dismiss();
          this.UtilitiesService.errorBag('Pin Error',error.error.data);
          // alert(error.error.data[0])
          console.log(error);
        },
        //completed callback
        () => {
          this.loadingController.dismiss();
          console.log("Completed");
          this.alertHeader = "Success Alert";
          this.alertMessage = resData.response_message;
          this.XpassService.updateUserInstance(resData.data);
          this.XpassService.presentAlert(this.alertHeader, this.alertMessage);        
          this.navCtrl.navigateRoot("/");        
        })
    }        
  }

  updatePin(form){
    let body = form.value;
    console.log(body);    
    let resData;
    if (!this.formPay.valid) {
      if(this.formPay.controls.old_pin.hasError('required')){
        this.alertMessage = `Old Pin is required`;
      }else if (this.formPay.controls.pin.hasError('required')) {
        this.alertMessage = `Pin is required`;
      } else if (this.formPay.controls.pin_confirmation.hasError('required')) {
        this.alertMessage = `Pin Confirmation is required`;
      } 
      this.XpassService.presentAlert(this.alertHeader, this.alertMessage)
    }else{
      this.UtilitiesService.presentLoading();
      this.XpassService.updatePin(body).subscribe((data) => {
        resData = data;
        console.log(data)
      },
        (error) => {
          this.loadingController.dismiss();
          this.alertHeader = "Link Error";
          this.alertMessage = error.error.data[0];
          this.XpassService.presentAlert(this.alertHeader, this.alertMessage)
          // alert(error.error.data[0])
          console.log(error);
        },
        //completed callback
        () => {
          this.loadingController.dismiss();
          console.log("Completed");
          this.alertHeader = "Success Alert";
          this.alertMessage = resData.response_message;
          this.XpassService.updateUserInstance(resData.data);
          this.XpassService.presentAlert(this.alertHeader, this.alertMessage);        
          this.navCtrl.navigateRoot("/");        
        })
    }        
  }

}
