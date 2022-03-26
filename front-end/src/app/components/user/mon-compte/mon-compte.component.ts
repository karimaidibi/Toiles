import { Subscription } from 'rxjs';
import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit,OnDestroy {

  userSub!: Subscription
  user!: User
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
    // récuperer l'id depuis la route
    this.userSub = this.userService.user$.subscribe({
      next: (user: any)=>{
        this.user = user
      },
      error: (err)=>{
        this.router.navigate(['/not-found'])
        console.log(err.message)
      },
      complete : ()=>{
        console.log("complete")
      }
    })
    this.userService.getUserById(this.userId)
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

  logout(){
    this.authService.logout()
    window.location.reload();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe()
  }
}
