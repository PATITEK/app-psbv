import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router,
    private route: ActivatedRoute,) {}
  onGoToSpc() {
    console.log('hihi');
    const data = {
      checkBack: false
    }
    this.router.navigate(['main/shopping-cart'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
 
  }
}
