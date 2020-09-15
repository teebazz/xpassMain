import { Component, OnInit } from '@angular/core';
import {XpassService} from '../services/xpass.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.page.html',
  styleUrls: ['./transaction-list.page.scss'],
})
export class TransactionListPage implements OnInit {

  constructor(public XpassService: XpassService, public router : Router) { }
  transactionLoader : any = true;
  latestTransaction : any = [];
  ngOnInit() {
    this.XpassService.latestTransactionAllList.subscribe((res: any) =>{   
      if(res.length == 0){
        this.XpassService.latestTransactionAll();
      }  else{
        this.latestTransaction = res;         
      }                               
    }); 
  }
  gotoTransaction(transaction){
    this.XpassService.transaction = transaction;
    this.router.navigate(['transaction-page']);
  }

}
