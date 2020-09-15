import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service';
import {Router} from '@angular/router'
import { NavController } from '@ionic/angular';
import {UtilitiesService} from '../services/utilities.service';

@Component({
  selector: 'app-airtime-data',
  templateUrl: './airtime-data.page.html',
  styleUrls: ['./airtime-data.page.scss'],
})
export class AirtimeDataPage implements OnInit {
  segmentModel : any = 'airtime';
  artimeList : any ;
  constructor(public XpassService: XpassService,public router : Router,private navCtrl: NavController, private UtilitiesService : UtilitiesService) { }

  ngOnInit() {
    this.getAirtime();
    // this.getData();
  }

  getAirtime(){
    this.XpassService.getPayBills('1,2').then((resp: any) => {
      // console.log(resp);      
      this.artimeList = resp.body;
      console.log(this.artimeList);
      
    })
  }
  getData(){
    this.XpassService.getPayBills('2').then((resp: any) => {
      // console.log(resp);      
      this.artimeList = resp.body;
    })
  }

  segmentChanged(event){
    console.log(event);    
  }

  gotoService(service){
    this.XpassService.services = service;
    this.navCtrl.navigateForward('/buy-service');
  }

}
