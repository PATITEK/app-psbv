import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config/api';
import { catchError, map } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { SUCCESS } from '../@http-config/messages';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/@app-core/storage.service';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    // private toastr: ToastrService,
    private router: Router,
    private storage: StorageService,
  ) { }

  public forgotPassword(req){
        return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD}`, req).pipe(
          map((result)=> {
            return result;
          }),
          catchError((errorRes: any) => {
            throw errorRes.error;
          }));
        
  }
  public login(req) {
    return this.http.post(`${APICONFIG.AUTH.LOGIN}`, req).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.AUTH.LOGIN);
        this.setLocalStore(result);
        return result;
      }),
      catchError((errorRes: any) => {
        localStorage.clear();
        this.storage.clear();
        throw errorRes.error;
      }));
  }

  logout() {
    localStorage.clear();
    this.storage.clear();
    this.router.navigateByUrl('/auth/login');
  }

  checkLogin() {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      return false;
    } else {
      return true;
    }
  }

  private setLocalStore(data) {
    localStorage.setItem('Authorization', data.token);
    localStorage.setItem('fullname', data.fullname);
    localStorage.setItem('exp', data.exp);
  }
}
