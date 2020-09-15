import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionPagePage } from './transaction-page.page';

describe('TransactionPagePage', () => {
  let component: TransactionPagePage;
  let fixture: ComponentFixture<TransactionPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
