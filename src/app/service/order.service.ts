import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})/* This class is the service that will be injected into the controller. */

export class OrderService {

  constructor(private http: HttpClient) { }

/**
 * It creates a new order and adds it to the database.
 * @param {any} orderDTO - The orderDTO object that contains the order details.
 * @returns An Observable of type any.
 */
  placeOrder(orderDTO: any): Observable<any>{
    const token = localStorage.getItem("token") 
    return this.http.post(`http://localhost:8282/order/add/${token}`, orderDTO);
  }

}
