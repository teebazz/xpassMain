import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionConfirmPagePage } from './transaction-confirm-page.page';

describe('TransactionConfirmPagePage', () => {
  let component: TransactionConfirmPagePage;
  let fixture: ComponentFixture<TransactionConfirmPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionConfirmPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionConfirmPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
