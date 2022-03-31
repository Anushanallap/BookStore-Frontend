import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

/* This is a decorator. It is used to define a component. */
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  formGroup!: FormGroup;


  constructor(private userService: UserService, private router: Router) {
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  /* Used to initialize the component. */
  ngOnInit(): void {
  }
  // forgotpass = false
  // onForgotPassword(){
  //   this.forgotpass = !this.forgotpass
  // }

  /**
   * Create a new FormGroup object and set the form controls to be the username and password
   */
  initForm(){
   
  }

  // onVerify(){
  //   this.userService.forgotPassword(this.formGroup.get("username")?.value, this.formGroup.get("password")?.value)
  //   .subscribe(data =>{
  //     console.log("data ======>", data);
  //     this.onForgotPassword()
  //     this.ngOnInit()
      

  //   })
  // }

}
