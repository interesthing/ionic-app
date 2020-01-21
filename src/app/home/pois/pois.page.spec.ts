import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PoisPage } from './pois.page';

describe('PoisPage', () => {
  let component: PoisPage;
  let fixture: ComponentFixture<PoisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
