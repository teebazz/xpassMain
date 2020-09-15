import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { XpassService } from '../services/xpass.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {UtilitiesService} from '../services/utilities.service'

@Component({
  selector: 'app-transaction-confirm-page',
  templateUrl: './transaction-confirm-page.page.html',
  styleUrls: ['./transaction-confirm-page.page.scss'],
})
export class TransactionConfirmPagePage implements OnInit {

  transaction: any;
  constructor(public navCtrl: NavController, public xpassService: XpassService, private fileOpener: FileOpener, private file: File, private transfer: FileTransfer, private loadingController: LoadingController,private UtilitiesService : UtilitiesService) {

  }

  ngOnInit() {
    this.transaction = this.xpassService.transaction;
  }

  gotoHome() {
    this.navCtrl.navigateRoot("/");
  }


  generateReceipt() {
    this.UtilitiesService.presentLoading();
    let body = {
      reference: this.transaction.transaction.reference
    }
    let resBody;
    this.xpassService.generateReceipt(body).subscribe((res: any) => {
      resBody = res;
    },
      (error) => {
        console.log(error);
        this.loadingController.dismiss();
      },
      () => {        
        const fileTransfer: FileTransferObject = this.transfer.create();
        const url = resBody.data;
        console.log(url);
        fileTransfer.download(url, this.file.dataDirectory + 'receipt.pdf').then((entry) => {
          // alert('download complete: ' + entry.toURL());
          this.fileOpener.open(entry.toURL(), 'application/pdf')
            .then(() => {
              this.loadingController.dismiss();
            })
            .catch(e => {
              this.loadingController.dismiss();
              console.log('Error opening file', e);
            });
        }, (error) => {
          alert(error);
        });
      }
    );
  }

}
