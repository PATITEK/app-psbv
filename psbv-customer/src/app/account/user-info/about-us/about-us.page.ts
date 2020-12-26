import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/@app-core/http';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor(private router: Router, private accountService: AccountService, private pageNotiService: PageNotiService) { }
  model: any = {
    "fullname": localStorage.getItem('fullname'),
    "question": "Text here ..." 
   };
   email:'';
   data: {
     user: {
       email:'';
     }
   }
  
  ngOnInit() {
  }
  goBack() {
    this.router.navigateByUrl('account/user-info');
  }
  onSubmit(){
   this.accountService.getAccounts().subscribe((data)=> {
      this.email = data['user']['email'];
    })
    const datapasing: IDataNoti = {
      title: 'SUCCESS !',
      description: 'Your response has been delivered',
      routerLink: '/account/user-info'
    }
    var obj_req = {
        "email_customer": this.email,
        "email_admin":"hoaimiqng@gmail.com",
        "content": this.model.question
    }

   this.accountService.ContactAdmin(obj_req).subscribe((data)=> {
      console.log(data);
      this.pageNotiService.setdataStatusNoti(datapasing);
        this.router.navigate(['/statusNoti']);
   })
  }
}
