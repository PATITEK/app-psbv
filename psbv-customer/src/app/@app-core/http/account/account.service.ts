import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG, SUCCESS, STATUS } from '../@http-config';
// import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { requestQuery } from 'src/app/@app-core/utils';
import { IPageRequest } from '../global';
import { IAccount, IGetAccounts, IPageAccount } from './account.DTO';

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient,
    // private toastr: ToastrService,
  ) { }
  permission: string;
  userProfile;
  public getAccounts(request: IGetAccounts) {
    return this.http.get<IGetAccounts>(`${APICONFIG.ACCOUNT.PROFILE_USER}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
  public checkRole() {
    if(localStorage.getItem('Authorization') === null)
    {
        this.permission = 'GUEST';
    }
    else {
     this.getAccounts(this.userProfile).subscribe((data) => {
        this.userProfile = {
            role: data.user.role,
        }
        console.log(this.userProfile.role);
     })
    }
    
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
