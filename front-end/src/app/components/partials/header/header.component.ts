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
  private adminId = environment.ADMIN_ID
  isAdmin!: boolean
  userId!: any

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.VerifSignIn()
  }

  // assigner is auth a true si user est connecté
  VerifSignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
        this.userId = this.authService.userId
        if(this.userId === this.adminId){
          this.isAdmin = true
        }
      }
    )
  }

  logout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
      this.authService.isAuth$.unsubscribe()
  }

}
