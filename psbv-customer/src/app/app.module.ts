import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotiService } from './@modular/page-noti/page-noti.service';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './@app-core';
<<<<<<< HEAD
=======

import { HomePage } from './home/home.page';
>>>>>>> b137da8560b48fcfadbbf54f4f091a6594a76fb3

@NgModule({
  declarations: [AppComponent, HomePage],
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
