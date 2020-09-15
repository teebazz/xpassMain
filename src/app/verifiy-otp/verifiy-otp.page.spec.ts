import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifiyOtpPage } from './verifiy-otp.page';

describe('VerifiyOtpPage', () => {
  let component: VerifiyOtpPage;
  let fixture: ComponentFixture<VerifiyOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiyOtpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifiyOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
