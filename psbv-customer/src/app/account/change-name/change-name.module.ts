import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeNamePageRoutingModule } from './change-name-routing.module';

import { ChangeNamePage } from './change-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeNamePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ChangeNamePage]
})
export class ChangeNamePageModule {}
