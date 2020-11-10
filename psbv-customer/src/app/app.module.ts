import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {HttpClientModule} from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotiService } from './@modular/page-noti/page-noti.service';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './@app-core';
import { TabsService } from './core/tabs.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    CoreModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PageNotiService,
    TabsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
