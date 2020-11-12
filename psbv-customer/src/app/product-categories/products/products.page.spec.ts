import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD:psbv-customer/src/app/product-categories/product-categories.page.spec.ts
import { ProductCategoriesPage } from './product-categories.page';

describe('ProductCategoriesPage', () => {
  let component: ProductCategoriesPage;
  let fixture: ComponentFixture<ProductCategoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCategoriesPage);
=======
import { ProductsPage } from './products.page';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
>>>>>>> FEmimi:psbv-customer/src/app/product-categories/products/products.page.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
