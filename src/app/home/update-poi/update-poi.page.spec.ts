import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatePoiPage } from './update-poi.page';

describe('UpdatePoiPage', () => {
  let component: UpdatePoiPage;
  let fixture: ComponentFixture<UpdatePoiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePoiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePoiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
