import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestPaystackPage } from './test-paystack.page';

describe('TestPaystackPage', () => {
  let component: TestPaystackPage;
  let fixture: ComponentFixture<TestPaystackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPaystackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestPaystackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
