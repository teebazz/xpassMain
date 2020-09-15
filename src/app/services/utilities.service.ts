import { Injectable } from '@angular/core';
import { LoadingController, NavController,AlertController } from '@ionic/angular';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private loadingController: LoadingController,public alert : AlertController) { }

  Loader: boolean = false;
  // loading notification when login is clicked
  async presentLoading(message="") {
    this.Loader = true;
    const loading = await this.loadingController.create({
      message: message || 'Please wait..',
      duration: 70000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    this.Loader = false; //set back to false onDismiss
    console.log('Loading dismissed!');
  }


  async presentAlert(header, message) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  errorBag(error_header,error_meesage,error_code = null){
    if (error_meesage == '' || error_meesage  == undefined) {
      this.presentAlert('Service Error','Internal server error. Please check your internet');
    }else{
      this.presentAlert(error_header,error_meesage);
    }    
  }
}
