import { Component } from '@angular/core';
import {XpassService} from '../services/xpass.service'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: [
    'tab2.page.scss',
    'tab2-shell.scss'
]
})
export class Tab2Page {
  imgx : any = 'https://vtpass.com/resources/products/200X200/MTN-Airtime.jpg';
  service_categories : any;
  constructor(public XpassService: XpassService,private navCtrl: NavController) {
    this.XpassService.getPayBills('4,5,6,7,3').then((resp: any) => {
      // console.log(resp);      
      this.service_categories = resp.body;
    })
  }

  gotoService(service){
    this.XpassService.services = service;
    this.navCtrl.navigateForward('/buy-service');
  }

}
