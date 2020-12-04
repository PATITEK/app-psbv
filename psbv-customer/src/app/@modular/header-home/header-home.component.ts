import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/@app-core/auth-guard.service';
import { ProductsService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss'],
})
export class HeaderHomeComponent implements OnInit {

  constructor(
  ) { }
  

  ngOnInit() {
   }

 
}
