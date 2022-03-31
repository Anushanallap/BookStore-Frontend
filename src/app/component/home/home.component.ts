import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/* This class is used to display the home page of the application */
export class HomeComponent implements OnInit {

  books!: Book[];
  bookIdLIst: number[] = []
  sold = "OUT OF STOCK"
  bookName:any

 /**
  * The constructor function is called when the component is created. 
  * used to inject dependencies into the component. 
  * The constructor function is where you declare and initialize the instance variables of the
  * component
  * @param {BookService} bookService - The book service is injected into the component.
  * @param {CartService} cartService - The cart service is injected into the constructor.
  * @param {Router} router - The router is needed to navigate to the cart page.
  * @param {ActivatedRoute} route - ActivatedRoute
  */
  constructor(private bookService: BookService,private cartService: CartService, private router: Router, private route: ActivatedRoute) {
  }
/* This is used to get the book name from the url and get the book by name. */

  ngOnInit(): void {
    this.bookName =  this.route.snapshot.paramMap.get('name') || null
    if(this.bookName != null){
      this.bookService.getBookByName(this.bookName).subscribe(data =>{
        this.books = data
        this.ngOnInit()
      })
    }else{
      this.getBookIdLIst()
      this.backToLOginPage();
      this.reloadData();
    }
   

  }

 /**
  * It reloads the data from the database.
  */
  reloadData(){
    this.bookService.getAllbooks().subscribe((data:Book[]) =>{
      this.books = data;
    })
  }
 
 /**
  * This function is used to get all the book id's from the cart
  */
  getBookIdLIst(){
    this.cartService.getAllCartBookId(localStorage.getItem("token") || "").subscribe((data: number[]) => this.bookIdLIst = data)
    console.log(this.bookIdLIst)
    console.log(this.bookIdLIst.length)

  }

 /**
  * It adds a book to the cart.
  * @param {number} book_id - The id of the book that the user wants to add to their cart.
  */
  addToCart(book_id: number){
    var cartDTO = {"quantity": 1, "user_id": localStorage.getItem("token"), "book_id": book_id}
    this.cartService.addToCart(cartDTO).subscribe() 
    setTimeout(() =>{this.ngOnInit()},300)
  }

  /**
   * This function checks if the user is logged in or not. If the user is logged in, it will redirect
   * the user to the home page. If the user is not logged in, it will redirect the user to the login
   * page
   */
  backToLOginPage(){
    const token = localStorage.getItem("token");
    if(token == null){
      this.router.navigate(['']);
      
    } 
  }

 /**
  * The function takes in a number and then calls the sort function in the bookService. 
  * The sort function takes in a number and then returns an observable. 
  * The observable is then subscribed to and the books are set to the data returned by the observable
  * @param {number} num - number
  */
  Onsort(num:number){
      this.bookService.sort(num).subscribe(data =>{this.books = data; })
  }
}

