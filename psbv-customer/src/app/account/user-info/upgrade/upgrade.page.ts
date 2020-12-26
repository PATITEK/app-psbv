import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.page.html',
  styleUrls: ['./upgrade.page.scss'],
})
export class UpgradePage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  setFalse() {

  }

  showAlert() {
    this.router.navigate(['/statusNoti']);
  }
}
