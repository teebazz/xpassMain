import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  name : any;
  userDetails : any;
  constructor(public router : Router,public XpassService: XpassService) { }

  ngOnInit() {
    this.XpassService.loginData.subscribe((res : any)=>{    
      console.log(res);     
      this.name = res.name;
      this.userDetails = res;
    }); 
  }

  ionViewWillEnter() {
    // console.log(this.XpassService.loginData);    
  }

  gotoTransaction(){
    this.router.navigate(['transaction-list']);
  }

  pinSetup(){
    this.router.navigate(['pin-setup']);
  }

  gotoAccount(){
    this.router.navigate(['account-settings']);
  }

  passwordChange(){
    this.router.navigate(['change-password']);
  }
  gotoGidaloTransfer(){
    this.router.navigate(['gidalo-transfer']);
  }

}
