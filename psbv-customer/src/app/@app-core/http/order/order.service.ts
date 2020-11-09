import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG, SUCCESS, STATUS } from '../@http-config';
import { catchError, map } from 'rxjs/operators';
import { requestQuery } from 'src/app/@app-core/utils';
import { IPageRequest } from '../global';
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class OrderService {

  constructor(
    private http: HttpClient,
    // private toastr: ToastrService,
  ) { }

  public getOrders(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.ORDER.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getOrderDetail(id: string) {
    return this.http.get<any>(`${APICONFIG.ORDER.GETDETAIL(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public editOrder(id: string, modifer: any) {
    return this.http.put<any>(`${APICONFIG.ORDER.EDIT(id)}`, modifer).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.EDIT, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

    // XOA
    // public DeleteOrder(id: string) {
    //   return this.http.delete(`${APICONFIG.ORDER.DELETE(id)}`).pipe(
    //     map((result) => {
    //       return result;
    //     }),
    //     catchError((errorRes: any) => {
    //       throw errorRes.error;
    //     }));
    // }
}