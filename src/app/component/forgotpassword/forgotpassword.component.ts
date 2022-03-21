import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  formGroup!: FormGroup;


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
  }
  forgotpass = false
  onForgotPassword(){
    this.forgotpass = !this.forgotpass
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onVerify(){
    this.userService.forgotPassword(this.formGroup.get("username")?.value, this.formGroup.get("password")?.value)
    .subscribe(data =>{
      console.log("data ======>", data);
      this.onForgotPassword()
      this.ngOnInit()
      

    })
  }

}
