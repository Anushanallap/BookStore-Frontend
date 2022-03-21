import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url = "http://localhost:8282/user";
  constructor(private http: HttpClient) { }

  
  userLogin(email:string, psw:string): Observable<any>{
    const params = new HttpParams()
                .set('email', email)
                .set('psw', psw);
    return this.http.post(`http://localhost:8282/user/login`, params);
  }

  register(regDetails:any): Observable<any>{
    return this.http.post(`http://localhost:8282/user/adduser`, regDetails);
  }

  verification(regDetails:any): Observable<any>{
    return this.http.post(`http://localhost:8282/user/verifyuser`, regDetails);
  }

  forgotPassword(email:string, psw:string): Observable<any>{
    const params = new HttpParams()
                .set('token', email)
                .set('psw', psw);
    return this.http.post(`http://localhost:8282/user/forgotpsw`, params);
  }
}
