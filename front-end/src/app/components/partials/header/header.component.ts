import { BehaviorSubject } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth!: boolean
  isAdmin: boolean = false
  adminId = environment.ADMIN_ID

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.VerifSignIn()
  }

  // assigner is auth a true si user est connecté
  VerifSignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
        this.verifyAdmin()
      }
    )
  }

  verifyAdmin() : void {
    if(this.isAuth){
      console.log(this.authService.userId)
      console.log(this.adminId)
      if (this.authService.userId === this.adminId){
        this.isAdmin = true
        console.log('ok')
      }
    }
  }

  logout(){
    this.authService.logout()
    if (this.isAdmin){
      this.isAdmin = false
    }
  }

  ngOnDestroy(): void {
      this.authService.isAuth$.unsubscribe()
  }

}
