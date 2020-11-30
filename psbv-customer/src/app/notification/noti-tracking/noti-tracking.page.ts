import { Component, OnInit } from '@angular/core';

export interface IDetails {
  title: string;
  des: string;
  day: string;
  src: string;
}
@Component({
  selector: 'app-noti-tracking',
  templateUrl: './noti-tracking.page.html',
  styleUrls: ['./noti-tracking.page.scss'],
})
export class NotiTrackingPage implements OnInit {

  constructor() { }

  Details: IDetails[] = [
    {
      title: "Sản phẩm mới",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg"
    },
    {
      title: "Trải nghiệm tính năng mới",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "01/08/2020",
      src: "/assets/img/products/anh1.jpg"
    },
    {
      title: "Thị trường 2020 có gì",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg"
    },
    {
      title: "Tháng 10 có gì hot",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg"
    },
    {
      title: "",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg"
    },
    {
      title: "Tháng 10 có gì hot",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg"
    },
    {
      title: "",
      des: "Sản phẩm 7989RF đời mới ra mắt vào tháng 9/2020",
      day: "10/10/2020",
      src: "/assets/img/products/anh1.jpg"
    },
  ]


  ngOnInit() {
  }

}
