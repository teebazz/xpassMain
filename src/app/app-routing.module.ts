import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pay-bills',
    loadChildren: () => import('./pay-bills/pay-bills.module').then( m => m.PayBillsPageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'airtime-data',
    loadChildren: () => import('./airtime-data/airtime-data.module').then( m => m.AirtimeDataPageModule)
  },
  {
    path: 'buy-service',
    loadChildren: () => import('./buy-service/buy-service.module').then( m => m.BuyServicePageModule)
  },  
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'fund-wallet',
    loadChildren: () => import('./fund-wallet/fund-wallet.module').then( m => m.FundWalletPageModule)
  },
  {
    path: 'card-pay',
    loadChildren: () => import('./card-pay/card-pay.module').then( m => m.CardPayPageModule)
  },
  {
    path: 'verify-otp',
    loadChildren: () => import('./verifiy-otp/verifiy-otp.module').then( m => m.VerifiyOtpPageModule)
  },
  {
    path: 'transaction-page',
    loadChildren: () => import('./transaction-page/transaction-page.module').then( m => m.TransactionPagePageModule)
  },
  {
    path: 'transaction-confirm-page',
    loadChildren: () => import('./transaction-confirm-page/transaction-confirm-page.module').then( m => m.TransactionConfirmPagePageModule)
  },
  {
    path: 'link-bvn',
    loadChildren: () => import('./link-bvn/link-bvn.module').then( m => m.LinkBvnPageModule)
  },
  {
    path: 'pin-setup',
    loadChildren: () => import('./pin-setup/pin-setup.module').then( m => m.PinSetupPageModule)
  },
  {
    path: 'transaction-list',
    loadChildren: () => import('./transaction-list/transaction-list.module').then( m => m.TransactionListPageModule)
  },
  {
    path: 'reset-password-one',
    loadChildren: () => import('./reset-password-one/reset-password-one.module').then( m => m.ResetPasswordOnePageModule)
  },
  {
    path: 'reset-password-two',
    loadChildren: () => import('./reset-password-two/reset-password-two.module').then( m => m.ResetPasswordTwoPageModule)
  },
  {
    path: 'test-paystack',
    loadChildren: () => import('./test-paystack/test-paystack.module').then( m => m.TestPaystackPageModule)
  },
  {
    path: 'variations',
    loadChildren: () => import('./modal/variations/variations.module').then( m => m.VariationsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
