import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/@app-core/http';
import { IDataNoti, PageNotiService} from 'src/app/@modular/page-noti/page-noti.service';



@Component({
  selector: 'app-selected-products',
  templateUrl: './selected-products.page.html',
  styleUrls: ['./selected-products.page.scss'],
})
export class SelectedProductsPage implements OnInit {

  cartItems: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageNotiService: PageNotiService,
    private orderService: OrdersService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cartItems = JSON.parse(params['data']).selectedItems;
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  goBack() {
    this.router.navigateByUrl('/main/shopping-cart');
  }

  calPrice(item) {
    return (item.price + item.accessories.reduce((acc, cur) => acc + cur.price, 0)) * item.quantity;
  }

  calTotalPrice(items) {
    return items.reduce((acc, cur) => {
      return acc + this.calPrice(cur);
    }, 0)
  }

  listAccessoriesName(item) {
    return item.accessories.reduce((acc, cur) => {
      return acc + ', ' + cur.name;
    }, '').substring(2);
  }

  sendMailQuote() {
    let order = [];
  
    console.log(this.cartItems)
      // for(let i = 0; i < this.cartItems.length; i++) {
      //   if(this.cartItems[i].accessories.length !== 0) {
         
      //     for(let j = 0; j< this.cartItems[i].accessories.length; j++) {
           
      //       for(let k = 0; k < this.cartItems[i].accessories.length; k++) {
      //         if(this.cartItems[i].accessories[k] === this.cartItems[i].accessories[j])
      //         {
      //             this.cartItems[i].accessories[j].quantity++;
      //         }
      //         else {
      //           var accessory = 
      //             {
      //               "amount":this.cartItems[i].accessories[k].quantity,
      //               "yieldable_type": "Accessory",
      //               "yieldable_id": this.cartItems[i].accessories[k].id
      //         }

      //         }
      //       }
              
      //         order.push(accessory)
      //     }
      //   }
      // for(let m = 0; i < this.cartItems.length; m++) {
      //   if(this.cartItems[i] === this.cartItems[m]) {
      //       this.cartItems[i].quantity++;
      //   }
      //   else {
      //     var product = 
      //     {
      //       "amount":this.cartItems[m].quantity,
      //       "yieldable_type":"Product",
      //       "yieldable_id": this.cartItems[m].id
      //     }
        
      //   }
      //   order.push(product)
      // }
      
        
        
      // }
   
    let tem_obj = {
      "order": {
      "order_details_attributes": order
      }
    }
    console.log(tem_obj);
    

    
   
    const senddata: IDataNoti = {
      title: 'SEND A EMAIL QUOTE',
      description: '',
      routerLink: 'main/shopping-cart'
    }
    this.orderService.createOrder(tem_obj).subscribe(data =>{
      console.log('thành công');
      console.log(data);
      
    })
    this.pageNotiService.setdataStatusNoti(senddata);
    this.router.navigate(['/statusNoti']);
}
}
