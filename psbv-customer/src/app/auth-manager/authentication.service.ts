import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './model';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private urlAPI = 'http://psvb-api-staging.techbuysoftwares.com/';
  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(
          JSON.parse(localStorage.getItem('currentUser'))
      );
      this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }
  public login = (email: string, password: string) => {
      const loginUrl = `${this.urlAPI}/app/auth/login`;
      const loginParams = {
          email: email,
          password: password
      }
      return this.http
          .post<any>(loginUrl, loginParams)
          .pipe(
              map((user) => {
                  console.log(user);
                  if (user != null) {
                      const newUser = {} as User;
                      newUser.email = user.email;
                      newUser.password = user.password;
                      console.log(newUser)
                      this.currentUserSubject.next(newUser);
                      return newUser;
                  } else {
                      return null;
                  }
              })
          );
  }

 
}