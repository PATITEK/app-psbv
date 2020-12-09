import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG, SUCCESS, STATUS } from '../@http-config';
// import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { requestQuery } from 'src/app/@app-core/utils';
import { IPageRequest } from '../global';
import { IAccount, IGetAccounts, IPageAccount } from './account.DTO';
import { promise } from 'protractor';
import { StorageService } from '../../storage.service';

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient,
    // private storage: StorageService,
    // private toastr: ToastrService,
  ) { }

  public getAccounts() {
    return this.http.get(`${APICONFIG.ACCOUNT.PROFILE_USER}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public updateName(name) {
    return this.http.put(`${APICONFIG.ACCOUNT.UPDATE_NAME}`, name).pipe(
      map((result:any) => {
      
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public updatePassword(pass) {
    return this.http.put(`${APICONFIG.ACCOUNT.UPDATE_PASS}`, pass).pipe(
      map((result) => {
     
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public getAccountDetail(id: string) {
    return this.http.get<any>(`${APICONFIG.ACCOUNT.GETDETAIL(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public editAccount(id: string, modifer: any) {
    return this.http.put<any>(`${APICONFIG.ACCOUNT.EDIT(id)}`, modifer).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.EDIT, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
  // XOA MOT NHAN VIEN
  public DeleteAccount(id: string) {
    return this.http.delete(`${APICONFIG.ACCOUNT.DELETE(id)}`).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.DELETE, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }


}
