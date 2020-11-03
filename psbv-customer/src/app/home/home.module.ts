import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { FooterNavComponent } from './footer-nav/footer-nav.component';
import { HeaderHomeComponent } from './header-home/header-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, FooterNavComponent, HeaderHomeComponent]
})
export class HomePageModule {}
