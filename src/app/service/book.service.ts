import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})

/* The BookService class is a class that has a constructor and a method. */

export class BookService {

  constructor(private http: HttpClient) { }

  /**
   * It returns an observable of type Book[]
   * @returns An Observable of type Book[]
   */
  getAllbooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`http://localhost:8282/book`);
  }
/**
 * Given a book id, return the book with that id
 * @param {number} book_id - The id of the book to be retrieved.
 * @returns An Observable of type Book[]
 */

  getBookById(book_id: number): Observable<any>{
    return this.http.get<Book[]>(`http://localhost:8282/book/${book_id}`);
  }

  /**
   * It returns an Observable of type Book[]
   * @param {String} book_name - The name of the book to be searched for.
   * @returns An Observable of type Book[]
   */
  getBookByName(book_name: String): Observable<any>{
    return this.http.get<Book[]>(`http://localhost:8282/book/bookname/${book_name}`);
  }

 /**
  * It returns an Observable of type Book[]
  * @param {number} num - number
  * @returns An Observable of type Book[]
  */
  sort(num: number): Observable<any>{
    return this.http.get<Book[]>(`http://localhost:8282/book/sort/${num}`);
  }

  changeBookQuantity(book_id:number, quantity:number): Observable<any>{
    const token = localStorage.getItem("token") 
    const params = new HttpParams()
                .set('book_id', book_id)
                .set('quantity', quantity);
    return this.http.post(`http://localhost:8282/book/changequantity/${token}`, params);
  }


}
