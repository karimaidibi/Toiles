import { BehaviorSubject } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth!: boolean

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.VerifSignIn()
  }

  // assigner is auth a true si user est connecté
  VerifSignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
      }
    )
  }

  logout(){
    this.authService.logout()
  }

}
