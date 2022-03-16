import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initSignIpForm()
  }

  initSignIpForm(){
    this.signInForm = this.formBuilder.group({
      /*validator required, email, mail length, max length*/
      email: this.formBuilder.control("", [Validators.required, Validators.email]),
      password: this.formBuilder.control("", [Validators.required,Validators.minLength(6)]),
    })
  }

  onSubmit() :void{

    let email = this.signInForm.get('email');
    if (email){
      email = email.value
    }
    let password = this.signInForm.get('password');
    if(password){
      password = password.value
    }
    this.authService.signin(email,password)
    .then(()=>{
      this.router.navigate(['/home'])
    })
    .catch((err)=>{
      this.errorMessage = err.message
    })
    }


}
