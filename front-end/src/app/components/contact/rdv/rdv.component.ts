import { Rdv } from './../../../models/rdv';
import { RdvService } from './../../../services/rdv.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {

  rdvForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string
  loading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rdvService: RdvService
  ) { }

  ngOnInit(): void {
    this.initRdvForm()
  }

  initRdvForm(){
    this.rdvForm = this.formBuilder.group({
      date: this.formBuilder.control(null,[Validators.required]),
      lieu: this.formBuilder.control(null,[Validators.required]),
      nom: this.formBuilder.control(null,[Validators.required]),
      prenom: this.formBuilder.control(null,[Validators.required]),
      email: this.formBuilder.control(null,[Validators.required, Validators.email]),
      telephone: this.formBuilder.control(null,[Validators.required]),
      message: this.formBuilder.control(null,[Validators.required])
    })
  }

  onSubmit() :void{
    this.loading = true
    let rdv = new Rdv()
    let date = this.rdvForm.get('date');
    if (date){
      rdv.date = date.value
      console.log(rdv.date)
      console.log(typeof rdv.date)
    }
    let lieu = this.rdvForm.get('lieu');
    if(lieu){
      rdv.lieu = lieu.value
    }
    let nom = this.rdvForm.get('nom');
    if(nom){
      rdv.nom = nom.value
    }
    let prenom = this.rdvForm.get('prenom');
    if(prenom){
      rdv.prenom = prenom.value
    }
    let email = this.rdvForm.get('email');
    if(email){
      rdv.email = email.value
    }
    let telephone = this.rdvForm.get('telephone');
    if(telephone){
      rdv.telephone = telephone.value
    }
    let message = this.rdvForm.get('message');
    if(message){
      rdv.message = message.value
    }
    // save rdv
    this.rdvService.createNewRdv(rdv)
    .then(()=>{
      this.rdvForm.reset()
      this.loading = false
      this.successMessage = "Merci ! Votre rendez-vous a bien été enregistré.\nNous revenons vers vous au cours de la semaine le plus vite possible\n à bientot !"
    })
    .catch((err)=>{
      console.log(rdv)
      this.loading = false
      this.errorMessage = err.message
      console.log(err)
    })
  }

}
