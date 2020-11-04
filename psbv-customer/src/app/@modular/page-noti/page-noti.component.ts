import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDataNoti, PageNotiService } from './page-noti.service';

@Component({
  selector: 'app-page-noti',
  templateUrl: './page-noti.component.html',
  styleUrls: ['./page-noti.component.scss'],
})
export class PageNotiComponent implements OnInit {
  public title = "PASSWORD CHANGED !";
  public des  = "Dear user your password has been changeed, Continue to start using app";
  public routerLink = ''
  constructor(
    private pageNotiService: PageNotiService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.pageNotiService.dataStatusNoti.subscribe((data: IDataNoti) => {
      this.title = data.title;
      this.des = data.description;
      this.routerLink = data.routerLink;
    })
  }

  linkRouter() {
    this.router.navigate([this.routerLink]);
  }

}
