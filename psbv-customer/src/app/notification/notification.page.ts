import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotoHome(){
    this.router.navigateByUrl('main/home');
  }
  gotoNoti(){
    this.router.navigateByUrl('notification/detail-notification');
  }
  gotoNotiStatus(){
    this.router.navigateByUrl('notification/noti-order-status');
  }
  gotoNotiTracking(){
    this.router.navigateByUrl('notification/noti-tracking');
  }
}
