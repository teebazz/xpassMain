import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AirtimeDataPage } from './airtime-data.page';

describe('AirtimeDataPage', () => {
  let component: AirtimeDataPage;
  let fixture: ComponentFixture<AirtimeDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirtimeDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AirtimeDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
