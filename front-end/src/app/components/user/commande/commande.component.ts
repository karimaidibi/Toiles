import { Commande } from './../../../models/commande';
import { Cart } from './../../../models/cart';
import { Subscription } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit, OnDestroy  {

  // commandes
  commandeSub!: Subscription
  commandes!: Commande[]

  // auth
  userId!: any
  private adminId = environment.ADMIN_ID
  isAdmin: boolean = false
  isAuth!: boolean

  //chargement
  loading: boolean = true

  constructor(
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    // verify signin
    this.verifSignIn()
    // get Commandes
    this.getCommandes()
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

  getCommandes(){
    this.commandeSub = this.userService.commandes$.subscribe({
      next:(commandes : any)=>{
        this.loading = false
        this.commandes = commandes
      },
      error: (err)=>{
        this.loading = false
        console.log(err)
      },
      complete :()=>{
        this.loading = false
      }
    });

    this.userService.getCommandes(this.userId)
  }

  ngOnDestroy(): void {
    this.commandeSub.unsubscribe()

}

}
