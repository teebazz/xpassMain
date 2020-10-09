import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareEarnPage } from './share-earn.page';

describe('ShareEarnPage', () => {
  let component: ShareEarnPage;
  let fixture: ComponentFixture<ShareEarnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareEarnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareEarnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
