import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config/api';
import { catchError, map } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
// import { SUCCESS } from '../@http-config/messages';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/@app-core/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private data: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    // private toastr: ToastrService,
    private router: Router,
    private storage: StorageService,
  ) { }

  public get receiveData(): Observable<any> {
    return this.data.asObservable();
  }
  public sendData(value: any) {
    this.data.next(value);
  }
  public forgotPassword(req) {
    return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD_EMAIL}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));

  }
  public checkcodePassword(req) {
    return this.http.post(`${APICONFIG.AUTH.CHECK_CODE_RESET}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }
      ));
  }
  public newPassword(req) {
    return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }
      ));
  }
  public resetPassword(req) {
    return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }
      ));
  }
  public login(req) {
    return this.http.post(`${APICONFIG.AUTH.LOGIN}`, req).pipe(
      map((result: any) => {
        this.storage.clear();
        console.log(result);
        localStorage.setItem('Authorization', result.token);
        localStorage.setItem('fullname', result.fullname);
        this.storage.setInfoAccount();
        
        //  this.toastr.success(SUCCESS.AUTH.LOGIN);
        return result;
      }),
      catchError((errorRes: any) => {
        localStorage.clear();
        this.storage.clear();
        throw errorRes.error;
      })
      );
  }
 
  logout() {
    localStorage.clear();
    this.storage.clear();
    this.storage.setInfoAccount();
    this.router.navigateByUrl('/main/home');
  }
  public signup(req) {
    return this.http.post(`${APICONFIG.AUTH.SIGNUP}`, req).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.AUTH.LOGIN);
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
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
