import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})/* The CartService class is a class that is used to manage the shopping cart. */

export class CartService {

  constructor(private http: HttpClient) { }
  addToCart(cart:Object): Observable<Object>{
    return this.http.post(`http://localhost:8282/cart/add`, cart)
  }
/**
 * This function will return an Observable of type any. 
 * 
 * The Observable will return a JSON object that contains an array of Cart objects.  
 * @param {String} token - The token that was returned from the login API call.
 * @returns An Observable of type any.
 */

  getAllCarts(token: String): Observable<any>{
    return this.http.get(`http://localhost:8282/cart/get/${token}`)
  }

  getAllCartBookId(token: String): Observable<any>{
    return this.http.get(`http://localhost:8282/cart/getbooklist/${token}`)
  }

  removeFromCart(cart_id: number): Observable<any> {
    console.log("rem")
    return this.http.delete(`http://localhost:8282/cart/remove/${cart_id}`);
  }

  removeAllCarts(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.delete(`http://localhost:8282/cart/removeall/${token}`);
  }

  changeQuantity(cart_id:number, quantity: number): Observable<any>{
    const token = localStorage.getItem("token");
    const params = new HttpParams()
                .set('cart_id', cart_id)
                .set('quantity', quantity);
    return this.http.put(`http://localhost:8282/cart/update/${token}`, params)
  }
}
