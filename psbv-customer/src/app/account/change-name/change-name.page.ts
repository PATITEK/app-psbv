import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.page.html',
  styleUrls: ['./change-name.page.scss'],
})
export class ChangeNamePage implements OnInit {
  model: any = {
    "fullname": localStorage.getItem('fullname')
  } ;

  formchangename = new FormGroup({
    rename: new FormControl('',[Validators.required], ),
  });
  public showSpinner = false;
  constructor( public alertCtrl: AlertController, private router:Router ) { }
 
  ngOnInit() {
 
  }
  onSubmit(f: NgForm) {
    this.showSpinner = true;
     this.router.navigate(['/statusNoti']);
    console.log(f.value); 
    console.log(f.valid); 

  }
}
