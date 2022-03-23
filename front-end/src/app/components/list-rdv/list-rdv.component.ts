import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { RdvService } from './../../services/rdv.service';
import { environment } from 'src/environments/environment';
import { Rdv } from './../../models/rdv';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-list-rdv',
  templateUrl: './list-rdv.component.html',
  styleUrls: ['./list-rdv.component.css']
})
export class ListRdvComponent implements OnInit, OnDestroy {

  rdvSub!: Subscription
  rdvs!: Rdv[]
  userId!: any
  loading: boolean = true
  private adminId = environment.ADMIN_ID
  isAdmin!: boolean
  isAuth!: boolean

  constructor(private rdvService: RdvService,
    private router : Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    // verify signin
    this.verifSignInAndAdmin()

    //get rdv
    this.rdvSub = this.rdvService.rdvs$.subscribe({
      next:(rdvs : any)=>{
        this.loading = false
        this.rdvs = rdvs
      },
      error: (err)=>{
        this.loading = true
        console.log(err)
      },
      complete :()=>{
      }
    });

    this.rdvService.getRdvs()
  }

  //assigner is auth a true si user est connecté
  verifSignInAndAdmin() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
        // verify admin
        this.userId = this.authService.userId
        if(this.userId === this.adminId){
          this.isAdmin = true
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.rdvSub.unsubscribe()

}

}
