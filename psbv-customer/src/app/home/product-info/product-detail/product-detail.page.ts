import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PERMISSION } from '../product-info.page';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {


  constructor(private router: Router, private location: Location,  private pageNotiService: PageNotiService,) {
  }

  permission: PERMISSION = PERMISSION.PREMIUM;

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  goBack() {
    this.location.back();
  }
  
  download() {
    event.preventDefault();
    const data: IDataNoti = {
      title: 'DOWNLOAD DONE',
      description: '',
      routerLink: ''
    }
    this.pageNotiService.setdataStatusNoti(data);
    this.router.navigate(['/statusNoti']);
  
  }

  checkPremiumPermission(): boolean {
    return this.permission === PERMISSION.PREMIUM;
  }

}
