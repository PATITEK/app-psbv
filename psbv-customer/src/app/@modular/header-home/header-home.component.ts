import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss'],
})
export class HeaderHomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  onGoUserInfo() {
    this.router.navigateByUrl('account/user-info');
  }
}
