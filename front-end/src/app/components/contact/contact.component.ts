import { ContactService } from './../../services/contact.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string
  loading: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService : ContactService
  ) { }

  ngOnInit(): void {
    this.initcontactForm()
  }

  initcontactForm(){
    this.contactForm = this.formBuilder.group({
      /*validator required, email, mail length, max length*/
      nom: this.formBuilder.control(null,[Validators.required]),
      prenom: this.formBuilder.control(null,[Validators.required]),
      email: this.formBuilder.control(null,[Validators.required, Validators.email]),
      sujet: this.formBuilder.control(null,[Validators.required]),
      message: this.formBuilder.control(null,[Validators.required])
    })
  }


  onSubmit() :void{
    this.loading = true
    let contactModel = {nom: '', prenom: '',email: '',sujet: '',message: ''}
    let nom = this.contactForm.get('nom');
    if(nom){
      contactModel.nom = nom.value
    }
    let prenom = this.contactForm.get('prenom');
    if(prenom){
      contactModel.prenom = prenom.value
    }
    let email = this.contactForm.get('email');
    if (email){
      contactModel.email = email.value
    }
    let sujet = this.contactForm.get('sujet');
    if(sujet){
      contactModel.sujet = sujet.value
    }
    let message = this.contactForm.get('message');
    if(message){
      contactModel.message = message.value
    }
    console.log(contactModel)
    this.contactService.sendMessage(contactModel)
    .then(()=>{
      this.loading = false
      this.successMessage = "votre mail a bien été envoyé, nous revenons vers vous le plus tot possible ! "
      this.contactForm.reset()
    })
    .catch((err)=>{
      this.loading = false
      this.errorMessage = "Votre mail n'a pas été envoyé, veuillez réessayer."
      console.log(err.message)
      this.contactForm.reset()
    })
  }


}
