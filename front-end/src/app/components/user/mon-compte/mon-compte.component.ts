import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  user!: any
  isAuth!: boolean
  userId!: any

  constructor(private authService : AuthService,
    private route: ActivatedRoute,
    private router :  Router,
    private userService : UserService
    ) { }

  ngOnInit(): void {
    // verify sign in then do the rest
    this.verifSignIn()
    this.initUserSubscription()
  }

  //assigner is auth a true si user est connecté
  verifSignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
        if(this.isAuth){
          this.userId = this.authService.userId
        }
      }
    )
  }

  initUserSubscription(): void{
    // récuperer l'id depuis la route
    if(this.isAuth){
      this.route.params.subscribe({
        next: (params : Params)=>{
          const id = params['id'];
          this.userService.getUserById(this.userId)
          .then((user : any)=>{
            this.user = user
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

  }

  logout(){
    this.authService.logout()
    window.location.reload();
  }
}
