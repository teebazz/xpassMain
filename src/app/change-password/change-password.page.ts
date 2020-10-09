import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service';
import { LoadingController,NavController} from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {UtilitiesService} from '../services/utilities.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  old_password : any;
  public formPay: FormGroup;
  password : any;
  password_confirmation : any;
  constructor(public XpassService: XpassService,private loadingController: LoadingController,public navCtrl : NavController,public formBuilder: FormBuilder,private UtilitiesService : UtilitiesService) {
  
  }
  ngOnInit() {
    this.formPay = this.formBuilder.group({
      old_password: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    }); 
  }
  alertHeader: string;
  alertMessage: string;
  updatePassword(form){
    let body = form.value;
    console.log(body);    
    let resData;
    if (!this.formPay.valid) {
      if(this.formPay.controls.old_password.hasError('required')){
        this.alertMessage = `Old Password is required`;
      }else if (this.formPay.controls.password.hasError('required')) {
        this.alertMessage = `Password is required`;
      } else if (this.formPay.controls.password_confirmation.hasError('required')) {
        this.alertMessage = `Password Confirmation is required`;
      } 
      this.XpassService.presentAlert(this.alertHeader, this.alertMessage)
    }else{
      this.UtilitiesService.presentLoading();
      this.XpassService.updatePassword(body).subscribe((data) => {
        resData = data;
        console.log(data)
      },
        (error) => {
          this.loadingController.dismiss();
          this.UtilitiesService.errorBag('Fund Error',error.error.data);
        },
        //completed callback
        () => {
          this.loadingController.dismiss();       
          this.XpassService.updateUserInstance(resData.data);
          this.XpassService.presentAlert("Success Alert", resData.response_message);        
          this.navCtrl.navigateRoot("/");        
        })
    }        
  }


}
