import { User } from './../../../../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from './../../../../services/auth.service';
import { UserService } from './../../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-infos-personnelles',
  templateUrl: './infos-personnelles.component.html',
  styleUrls: ['./infos-personnelles.component.css']
})
export class InfosPersonnellesComponent implements OnInit, OnDestroy {

  infosPersosForm!: FormGroup;
  errorMessage!: string;
  loading: boolean = false

  // auth
  user!: User
  userSub!: Subscription
  userId!: any
  private adminId = environment.ADMIN_ID
  isAdmin: boolean = false
  isAuth!: boolean

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService : UserService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.verifSignIn()
    this.getUserInfos()
  }

  //assigner is auth a true si user est connecté
  verifSignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
        if(bool){
          // get user id
          this.userId = this.authService.userId
          if(this.userId === this.adminId){
            this.isAdmin = true
          }
        }
      }
    )
  }

  getUserInfos() : void{
    this.loading = true
    this.userSub = this.userService.user$.subscribe({
      next: (user: any)=>{
        this.user = user
        this.initinfosPersosForm(this.user)
        this.loading = false
      },
      error: (err)=>{
        this.router.navigate(['/not-found'])
        console.log(err.message)
        this.loading = false
      },
      complete : ()=>{
        this.loading = false
        console.log("complete")
      }
    })
    this.userService.getUserById(this.userId)
  }

  initinfosPersosForm(user : User){
    this.infosPersosForm = this.formBuilder.group({
      /*validator required, email, mail length, max length*/
      username: this.formBuilder.control(user.username,[Validators.required]),
      nom: this.formBuilder.control(user.nom,[Validators.required]),
      prenom: this.formBuilder.control(user.prenom,[Validators.required]),
      rue: this.formBuilder.control(user.rue,[Validators.required]),
      ville: this.formBuilder.control(user.ville,[Validators.required]),
      codePostal: this.formBuilder.control(user.codePostal,[Validators.required]),
      pays: this.formBuilder.control(user.pays,[Validators.required]),
    })
  }

  onSubmit() :void{
    this.loading = true
    let user = new User()
    // couche de securité
    if(this.userId!== this.user._id){
      console.log("permission denied")
      this.router.navigate(['/not-found'])
      return;
    }
    // les innomions que j'ai récupére du formulaire
    let username = this.infosPersosForm.get('username');
    if (username){
      user.username = username.value
    }
    let nom = this.infosPersosForm.get('nom');
    if(nom){
      user.nom = nom.value
    }
    let prenom = this.infosPersosForm.get('prenom');
    if(prenom){
      user.prenom = prenom.value
    }
    let rue = this.infosPersosForm.get('rue');
    if(rue){
      user.rue = rue.value
    }
    let ville = this.infosPersosForm.get('ville');
    if(ville){
      user.ville = ville.value
    }
    let codePostal = this.infosPersosForm.get('codePostal');
    if(codePostal){
      user.codePostal = codePostal.value
    }
    let pays = this.infosPersosForm.get('pays');
    if(pays){
      user.pays = pays.value
    }
    // update user
    this.userService.updateUser(this.user._id,user)
    .then(()=>{
      this.infosPersosForm.reset() // re initialiser le formulaire
      this.loading = false
      this.router.navigate(['/galerie'])
    })
    .catch((err)=>{
      this.loading = false
      console.log(err.message)
    })

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

}
