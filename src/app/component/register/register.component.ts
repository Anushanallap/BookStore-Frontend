import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})/* The RegisterComponent class is a component that is used to register a new user. */

export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  verifyUser!: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router) { }

/**
 * This function is called when the component is initialized. 
 * It creates a form group and adds the form controls to it. 
 * It also sets the validators for the form controls
 */
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birth_date:[''] 
    });

  }

  onSubmit(){
    console.log("value() ",this.registerForm.value)
    this.userService.register(this.registerForm.value).subscribe(data =>{
      if(data.statusCode == 200){
        this.router.navigate(['verification', this.registerForm.value.email_id])
        // this.router.navigate(['login'])
      }
    })
  }
}

