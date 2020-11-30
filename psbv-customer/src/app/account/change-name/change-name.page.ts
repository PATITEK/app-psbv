import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/@app-core/http';

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
  constructor(private authService: AuthService,  public alertCtrl: AlertController ) { }
 
  ngOnInit() {
 
  }
  onSubmit(f: NgForm) {
    this.showSpinner = true;
    
    console.log(f.value); 
    console.log(f.valid); 

  }
}
