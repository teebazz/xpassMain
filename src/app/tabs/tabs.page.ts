import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {XpassService} from '../services/xpass.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public actionSheetController: ActionSheetController,public XpassService: XpassService, public router: Router) { }
  
  async ionViewDidEnter() {
    // This will be called everytime the page become active  
    this.XpassService.customerWallet();
    this.XpassService.latestTransaction();
    this.XpassService.latestTransactionAll();
    this.XpassService.bankList();
    this.XpassService.bankRecipientArrayList();
  }
  

  async presentActionSheet() {
    // alert('ooo');
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Transactions',
        icon: 'list-outline',
        handler: () => {
          this.router.navigate(['transaction-list']);
        }
      }, 
      {
        text: 'My Account',
        icon: 'person-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }, 
      {
        text: 'Transaction Pin',
        icon: 'key-outline',
        handler: () => {
          this.router.navigate(['pin-setup']);
        }
      }, 
      {
        text: 'Logout',
        icon: 'exit-outline',
        handler: () => {
          this.XpassService.logout();
        }
      }, 
      // {
      //   text: 'Favorite',
      //   icon: 'heart',
      //   handler: () => {
      //     console.log('Favorite clicked');
      //   }
      // }, 
      // {
      //   text: 'Cancel',
      //   icon: 'close',
      //   role: 'cancel',
      //   handler: () => {
      //     console.log('Cancel clicked');
      //   }
      // }
    ]
    });
    await actionSheet.present();
  }
  

}
