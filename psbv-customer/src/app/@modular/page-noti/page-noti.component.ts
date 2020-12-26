import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDataNoti, PageNotiService } from './page-noti.service';

@Component({
  selector: 'app-page-noti',
  templateUrl: './page-noti.component.html',
  styleUrls: ['./page-noti.component.scss'],
})
export class PageNotiComponent implements OnInit {
  public title = "";
  public des  = "";
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
    console.log("main",this.routerLink);
    this.router.navigateByUrl(this.routerLink);
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

}
