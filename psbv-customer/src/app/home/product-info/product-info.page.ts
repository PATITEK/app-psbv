import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {

  constructor(private router: Router) {
   }
  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
     Object.keys(tabs).map((key) => {
    tabs[key].style.display = 'none';
    });
  }

  goToHome(): void {
    this.router.navigateByUrl('/main/home');
  }
}
