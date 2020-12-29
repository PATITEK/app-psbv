import { Component, OnInit, Directive, ElementRef } from '@angular/core';

export interface IDetails {
  title: string;
  des: string;
  day: string;
  src: string;
  check:boolean
}
@Component({
  selector: 'app-noti-order-status',
  templateUrl: './noti-order-status.page.html',
  styleUrls: ['./noti-order-status.page.scss'],
})
@Directive({
  selector: 'appNoti'
})
export class NotiOrderStatusPage implements OnInit {

  constructor(private el: ElementRef) { }

  Details: IDetails[] = [
    {
      title: "Sản phẩm mới",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg",
      check: false
    },
    {
      title: "Trải nghiệm tính năng mới",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "01/08/2020",
      src: "/assets/img/products/anh1.jpg",
      check: false
    },
    {
      title: "Thị trường 2020 có gì",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg",
      check: false
    },
    {
      title: "Tháng 10 có gì hot",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg",
      check: false
    },
    {
      title: "",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg",
      check: false
    },
    {
      title: "Tháng 10 có gì hot",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg",
      check: false
    },
    {
      title: "",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg",
      check: false
    },
  ]
  

  ngOnInit() {
  }
  
}
