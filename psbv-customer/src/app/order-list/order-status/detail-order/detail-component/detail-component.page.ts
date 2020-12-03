import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.page.html',
  styleUrls: ['./detail-component.page.scss'],
})
export class DetailComponentPage implements OnInit {

  notes: string[] = [
    'component note 1',
    'component note 2 component note 2 component note 2 component note 2 component note 2',
    'component note 3',
    'component note 4'
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/main/order-status/detail-order');
  }
}