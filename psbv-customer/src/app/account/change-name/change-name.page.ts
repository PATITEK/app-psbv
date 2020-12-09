import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/@app-core/http';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';


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
  constructor( public alertCtrl: AlertController, private router:Router,
     private accountService: AccountService,  private pageNotiService: PageNotiService ) { }
 
  ngOnInit() {
 
  }
  onSubmit(f: NgForm) {
    this.showSpinner = true;
     var name = f.value;
    console.log(name.fullname);
    const datapasing: IDataNoti = {
      title: 'USER NAME CHANGED!',
      description: 'User name has been changed, Continue to start using app',
      routerLink: '/account/user-info'
    }
    
     this.accountService.updateName(name).subscribe((data)=> {
      localStorage.setItem('fullname', name.fullname);
       this.pageNotiService.setdataStatusNoti(datapasing);
        this.router.navigate(['/statusNoti']);
     }) 

  }
}
