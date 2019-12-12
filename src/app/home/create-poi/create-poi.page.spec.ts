import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePoiPage } from './create-poi.page';

describe('CreatePoiPage', () => {
  let component: CreatePoiPage;
  let fixture: ComponentFixture<CreatePoiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePoiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePoiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
