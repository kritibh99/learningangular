import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from  '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted  =  false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }


  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group(
      {
       email: ['', [Validators.required, Validators.email]],
       password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ]
    }
    );
  }
  get f(): { [key: string]: AbstractControl }{return this.loginForm.controls;}
  

  login(){
    console.log(this.loginForm.value);
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value);
    this.router.navigateByUrl('/admin');
  }


}
