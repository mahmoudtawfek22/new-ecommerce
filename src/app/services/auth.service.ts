import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../product';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  options;
  tokenSubject: BehaviorSubject<string>;
  token: string;
  constructor(private http: HttpClient, private cookie: CookieService) {
    this.token = cookie.get('token');
    this.tokenSubject = new BehaviorSubject<string>('');
    this.options = {
      headers: new HttpHeaders({
        Content: 'application/json',
      }),
    };
  }

  getToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }
  setToken(token: string) {
    this.cookie.set('token', token);
    this.tokenSubject.next(token);
  }
  logout() {
    this.cookie.delete('token');
    this.tokenSubject.next('');
  }
  auth(userData: User) {
    return this.http.post(
      'https://dummyjson.com/user/login',
      userData,
      this.options
    );
  }
  userdetails(token: string) {
    let options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.get('https://dummyjson.com/user/me', options);
  }
}
