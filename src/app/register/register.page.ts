import { Component, OnInit } from '@angular/core';
import { LoadingController,NavController} from '@ionic/angular';
import {XpassService} from '../services/xpass.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private loadingController: LoadingController,public xpassService : XpassService,private navCtrl: NavController, public router : Router) { }

  ngOnInit() {

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

  alertHeader: string;
  alertMessage: string;

  register(form) {
  console.log(form);
  this.presentLoading()
  let body = form.value;
  let resData;
  console.log(form.value);
  this.xpassService.register(body).subscribe((data) => {
    resData = data;
    console.log(data)
  },
    (error) => {
      this.loadingController.dismiss();
      this.alertHeader = "Registration Failed";
      this.alertMessage = error.error.data;
      this.xpassService.presentAlert(this.alertHeader, this.alertMessage)
      // alert(error.error.data[0])
      console.log(error)
    },
    //completed callback
    () => {
      this.loadingController.dismiss();
      console.log("Completed");
      this.xpassService.verification_type = 'registration';
      this.xpassService.email = resData.data.email;
        // switch segment back to login by calling the segment function
      this.router.navigate(['verify-otp']);
      // alert message
      this.alertHeader = "Registration Successful!"
      this.alertMessage = "Please check your email for otp to complete yout registration"
      this.xpassService.presentAlert(this.alertHeader, this.alertMessage);
    
    })
  }

}
