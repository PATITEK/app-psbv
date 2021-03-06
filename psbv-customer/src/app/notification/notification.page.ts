import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  doesClick = false;

  constructor(private router: Router) { }

  ngOnInit() {
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

  toggleActive() {
    this.doesClick = !this.doesClick;
  }
}
