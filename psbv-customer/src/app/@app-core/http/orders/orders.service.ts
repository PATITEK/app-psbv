import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { IPageRequest, APICONFIG } from '..';
import { requestQuery } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public STATUSES = [
    {
      NAME: 'confirmed',
      COLOR: '#B2E9FB'
    },
    {
      NAME: 'shipping',
      COLOR: '#F7BDAE'
    },
    {
      NAME: 'received',
      COLOR: '#F9D775'
    },
    {
      NAME: 'canceled',
      COLOR: '#CE091C'
    }
  ];
  public TYPES = {
    PRODUCT: {
      NAME: 'Product'
    },
    ACCESSORY: {
      NAME: 'Accessory'
    }
  }

  constructor(
    private http: HttpClient
  ) { }

  public getOrders(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.ORDERS.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getOrderDetail(id: string) {
    return this.http.get<any>(`${APICONFIG.ORDERS.GET_DETAIL(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public createOrder(data:any) {
    return this.http.post(`${APICONFIG.ORDERS.CREATE}`,data).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public editOrder(id: string, modifier: any) {
    return this.http.put<any>(`${APICONFIG.ORDERS.EDIT(id)}`, modifier).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.EDIT, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }

  public deleteOrder(id: string) {
    return this.http.delete(`${APICONFIG.ACCESSORIES.DELETE(id)}`).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.DELETE, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }

  public getHistory(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.ORDERS.GET_HISTORY}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
}
