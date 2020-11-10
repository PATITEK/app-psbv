import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHome(): void {
    this.router.navigateByUrl('/main/home');
  }

  toggleItem($event): void {
    console.log(event.target);
  }
}
