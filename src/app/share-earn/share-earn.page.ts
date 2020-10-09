import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service'
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-share-earn',
  templateUrl: './share-earn.page.html',
  styleUrls: ['./share-earn.page.scss'],
})
export class ShareEarnPage implements OnInit {
  share_code : '';
  constructor(public XpassService : XpassService,private clipboard: Clipboard,public toastController: ToastController,private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.XpassService.loginData.subscribe((res : any)=>{ 
      console.log(res);      
      this.share_code = res.referral_code;
    });
  }

  async copyToBoard(text){
    this.clipboard.copy(text);
    const toast = await this.toastController.create({
      message: 'Copied to clipboard',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  shareCode(code){
    this.socialSharing.share('I am inviting to download the gidalo app using my code '+code);
  }
}
