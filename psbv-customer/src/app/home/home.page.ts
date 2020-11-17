import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface IProducts {
   src: string;
   name: string;
   price: number;

}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  products : IProducts[] = [
    {
      src: "/assets/img/products/anh1.jpg",
      name:  "Product name 1",
      price: 75834 
    },
    {
      src: "/assets/img/products/anh1.jpg",
      name:  "Product name 2",
      price: 202048 
    },
    {
      src: "/assets/img/products/anh1.jpg",
      name:  "Product name 3",
      price: 948743
    },
    {
      src: "/assets/img/products/anh1.jpg",
      name:  "Product name 4",
      price: 144325 
    },
    {
      src: "/assets/img/products/anh1.jpg",
      name:  "Product name 5",
      price: 144325 
    },
    {
      src: "/assets/img/products/anh1.jpg",
      name:  "Product name 6",
      price: 10000
    },
    {
      src: "/assets/img/products/anh1.jpg",
      name:  "Product name 7",
      price: 12008
    },
    {
      src: "/assets/img/products/anh1.jpg",
      name:  "Product name 8",
      price: 11100
    },
  ];
  ngOnInit() {
    
  }
  gotodetail(){
    this.router.navigateByUrl('/main/home/product-info')
  }
}
