import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardPayPage } from './card-pay.page';

describe('CardPayPage', () => {
  let component: CardPayPage;
  let fixture: ComponentFixture<CardPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
