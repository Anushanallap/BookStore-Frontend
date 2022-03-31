import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  formGroup !: FormGroup;
  type= ""
  totalPrice = 0;
  bookIdLIst:number[] = []
  orderId = 0;
  bookQuantity = 1;
 
 

  carts!:any;
  constructor(private bookService: BookService, private cartService: CartService, private formBuilder: FormBuilder, private orderService: OrderService) {}
  
  token = localStorage.getItem("token") || "";
  
  ngOnInit(): void {
    this.getBookIdLIst();
    this.onReload();
    // this.initForm();
  }

 /**
  * This function is used to get all the book id's from the cart
  */
  getBookIdLIst(){
    this.cartService.getAllCartBookId(localStorage.getItem("token") || "").subscribe(data => {
      this.bookIdLIst = data;
    })
  }

  
  types: string[] = ['Home', 'Work', 'Others'];
  initForm(){
    this.formGroup = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      phone_no: new FormControl('', Validators.required),
      pin_code: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      landmark: new FormControl('', Validators.required),
      type: new FormControl('')
    })
  }

/**
 * This function is called when the user clicks the Place Order button. 
 * It calls the placeOrder() function of the orderService and passes the formGroup value to it. 
 * It then sets the orderId to the returned orderId and sets the checkout and continue variables to
 * false
 */
  onSubmit(){
    this.orderService.placeOrder(this.formGroup.value).subscribe(data => {
      this.orderId = data.data.order_id;
      console.log("=====>", data.data.order_id)
    });
    this.checkout = ! this.checkout;
    this.continue = ! this.continue
 
  }
/**
 * This function is used to get all the carts from the database
 */

  onReload(){
    this.cartService.getAllCarts(this.token).subscribe(data => {this.carts = data})
  }

  /**
   * It removes the item from the cart.
   * @param {number} cart_id - number
   */
  onRemove(cart_id: number){
    this.cartService.removeFromCart(cart_id).subscribe(data => this.onReload());
    
  }
 /* This is used to show and hide the customer details form. */
  custDetails = false;
  onPlaceOrder(){
    this.custDetails = !this.custDetails
    this.initForm();
  }

 /**
  * This function is used to increase the quantity of a book in the cart
  * @param {number} cart_id - The id of the cart that you want to change the quantity of.
  * @param {number} quantity - number
  * @param {number} book_id - the id of the book that was added to the cart
  */
  plus(cart_id: number, quantity: number, book_id:number){
    if(this.bookQuantity != 0){
      this.cartService.changeQuantity(cart_id, quantity+1).subscribe(data => this.onReload());
      this.changeBookQuantity(book_id, -1)
    }
    
  }

 /**
  * This function is used to decrease the quantity of a book in the cart
  * @param {number} cart_id - The id of the cart that you want to change the quantity of.
  * @param {number} quantity - number
  * @param {number} book_id - the id of the book that was added to the cart
  */
  minus(cart_id: number, quantity: number, book_id:number){
    if(quantity != 0 ){
      this.cartService.changeQuantity(cart_id, quantity-1).subscribe(data =>{this.onReload();});
      this.changeBookQuantity(book_id, 1)

    } 
  }

 /**
  * This function changes the quantity of a book in the database
  * @param {number} book_id - The id of the book that you want to change the quantity of.
  * @param {number} quantity - number
  */
  changeBookQuantity(book_id: number, quantity: number){
    this.bookService.changeBookQuantity(book_id, quantity).subscribe(data =>{
      this.bookQuantity = data.data.quantity
    })
  }
/* This is used to show and hide the customer details form. */

  continue = false;
  checkout = false;
  onContinue(){
    console.log("hello")
    this.continue = !this.continue
  }

  /**
   * Remove all items from the cart
   */
  onRemoveAll(){
    this.cartService.removeAllCarts().subscribe()
  
  }

}
