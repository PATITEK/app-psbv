import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule
  ]
})
export class ShoppingCartModule {
  constructor() {}

  ngOnInit() {}

  hasBackButton: boolean = false;

  toggleHasBackButton(): void {
    this.hasBackButton = !this.hasBackButton;
  }
 }
