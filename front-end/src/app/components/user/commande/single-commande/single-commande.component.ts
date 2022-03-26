import { AuthService } from './../../../../services/auth.service';
import { Commande } from './../../../../models/commande';
import { UserService } from './../../../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-commande',
  templateUrl: './single-commande.component.html',
  styleUrls: ['./single-commande.component.css']
})
export class SingleCommandeComponent implements OnInit {

  //commande
  commande!: Commande

  //auth
  isAuth!: boolean

  constructor(
    private route: ActivatedRoute,
    private userService : UserService,
    private router :  Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.verifySignIn()
    this.initCommandeSubscription()
  }

  initCommandeSubscription(): void{
    // récuperer l'id depuis la route
    this.route.params.subscribe({
      next: (params : Params)=>{
        const id = params['id'];
        this.userService.getCommandeById(id)
        .then((commande : any)=>{
          // couche securité
          if(this.hasRigh(commande)){
            this.commande = commande
          }
          else{
            this.router.navigate(['/not-found'])
            return;
          }
        })
        .catch((err)=>{
          this.router.navigate(['/not-found'])
          console.log(err.message)
        })
      },
      error: (err)=>{
        this.router.navigate(['/not-found'])
        console.log(err.message)
      },
      complete : ()=>{
        console.log("complete")
      }
    })
  }

  //assigner is auth a true si user est connecté
  verifySignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
      }
    )
  }

  hasRigh(commande: Commande): boolean{
    const hasRight = (this.authService.userId === commande.userId)
    return (this.isAuth && hasRight)
  }


}
