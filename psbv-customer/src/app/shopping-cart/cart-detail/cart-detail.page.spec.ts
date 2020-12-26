import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartDetailPage } from './cart-detail.page';

describe('CartDetailPage', () => {
  let component: CartDetailPage;
  let fixture: ComponentFixture<CartDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
