import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD
=======
<<<<<<< HEAD:psbv-customer/src/app/product-categories/products/products.page.spec.ts
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
=======
>>>>>>> b137da8560b48fcfadbbf54f4f091a6594a76fb3
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
<<<<<<< HEAD
=======
>>>>>>> b137da8560b48fcfadbbf54f4f091a6594a76fb3:psbv-customer/src/app/product-categories/product-categories.page.spec.ts
>>>>>>> b137da8560b48fcfadbbf54f4f091a6594a76fb3
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
