import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  hasBackButton: boolean = false;
  data;

  constructor(private location: Location, private route: ActivatedRoute) {
    
  }
  ionViewWillEnter(){
    
    console.log('has',this.hasBackButton);
    this.route.queryParams.subscribe((params) => {
      this.data = JSON.parse(params['data']);
      console.log('data',this.data);
      if(this.data.checkBack === true){
        this.hasBackButton = true;
        console.log('vao true',this.hasBackButton);
      }else{
        this.hasBackButton = false;
      }
    })
  }
  ngOnInit() {
  
  }

  checkHasBackButton(): boolean {
    return this.hasBackButton;
  }

  goBack() {
    this.hasBackButton = false;

    console.log('check',this.hasBackButton);
    
    this.location.back();
  }

}
