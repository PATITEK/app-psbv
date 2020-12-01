import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
// import * as jwt_decode from 'jwt-decode';

@Injectable()
export class StorageService {
    private userSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor() { }
    public clear() {
        this.userSub.next(null);
    }
    public get infoAccount(): Observable<any> {
        return this.userSub.asObservable();
    }
    public setInfoAccount(value: any) {
        // this.userSub.next(this.detokenUser(value));
    }
    public detokenUser(value) {
        //   const data = jwt_decode(value);
          return "";
    }
}
