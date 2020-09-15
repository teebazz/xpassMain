import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PinSetupPage } from './pin-setup.page';

describe('PinSetupPage', () => {
  let component: PinSetupPage;
  let fixture: ComponentFixture<PinSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinSetupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PinSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
