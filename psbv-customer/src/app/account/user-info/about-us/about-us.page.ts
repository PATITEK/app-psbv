import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor(private router: Router) { }
  model: any = {
    "fullname": localStorage.getItem('fullname'),
    "question": "Text here ..." 
   };
  
  ngOnInit() {
  }
  goBack() {
    this.router.navigateByUrl('account/user-info');
  }

}
