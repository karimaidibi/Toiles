
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  errorMessage!: string;
  loading: boolean = false

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initSignUpForm()
  }

  initSignUpForm(){
    this.signUpForm = this.formBuilder.group({
      /*validator required, email, mail length, max length*/
      firstname: this.formBuilder.control(""),
      lastname: this.formBuilder.control(""),
      email: this.formBuilder.control("", [Validators.required, Validators.email]),
      password: this.formBuilder.control("", [Validators.required,Validators.minLength(6)]),

    })
  }

  onSubmit() :void{
    this.loading = true

    let email = this.signUpForm.get('email');
    if (email){
      email = email.value
    }
    let password = this.signUpForm.get('password');
    if(password){
      password = password.value
    }
    let firstname = this.signUpForm.get('firstname');
    if(firstname){
      firstname = firstname.value
    }
    let lastname = this.signUpForm.get('lastname');
    if(lastname){
      lastname = lastname.value
    }
    this.authService.signup(email,password,lastname,firstname)
    .then(()=>{
      this.loading = false
      this.router.navigate(['/home'])
    })
    .catch((err)=>{
      this.loading = false
      console.log(err.message)
      this.errorMessage = "Cet adresse email est déjà utilisée par un autre utilisteur, veuillez choisir une autre."
    })
  }

}
