import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GidaloTransferPage } from './gidalo-transfer.page';

describe('GidaloTransferPage', () => {
  let component: GidaloTransferPage;
  let fixture: ComponentFixture<GidaloTransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GidaloTransferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GidaloTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
