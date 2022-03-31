import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})/* The UserService class is a class that has a constructor and a method. */

export class UserService {


  private url = "http://localhost:8282/user";
  constructor(private http: HttpClient) { }

 /**
  * It sends a post request to the server with the email and password.
  * @param {string} email - The email of the user.
  * @param {string} psw - the password of the user
  * @returns An Observable of type any.
  */
  
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
