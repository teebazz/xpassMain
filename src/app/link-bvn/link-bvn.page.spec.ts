import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkBvnPage } from './link-bvn.page';

describe('LinkBvnPage', () => {
  let component: LinkBvnPage;
  let fixture: ComponentFixture<LinkBvnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkBvnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkBvnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
