import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  salutationSub!: Subscription;
  nombresPairsSub!: Subscription;
  secondes! : any

  constructor() { }

  ngOnInit(): void {
    const salutation = new Observable((observer)=>{
      observer.next("Hello") // emettre une donnée, c'est le premier packet retpurné
      observer.next('world!') // deuxième paquet
      observer.complete() // dire que j'ai finis de recevoir
    });

    // un observable qui emet des nombres chaque 1 seconde
    const nbre = interval(1000)

    // utiliser l'observable il faut s'abonner à l'observable
    this.salutationSub = salutation.subscribe({
      //recuperer la valeur et réagir a cette valeur
      next: (value)=>{
        console.log("Value observable: " + value)
      },
      // recuperer l'erreur si ça existe
      error: (error)=>{
        console.log('error observable' + error)
      },
      //si l'observable est complété
      complete: ()=>{
        console.log("observable completé")
      },

      }
    );

    this.nombresPairsSub = nbre.subscribe(
      {
        //recuperer la valeur et réagir a cette valeur
        next: (value)=>{
          this.secondes = value
          //console.log("Value observable: " + value)
        },
        // recuperer l'erreur si ça existe
        error: (error)=>{
          console.log('error observable' + error)
        },
        //si l'observable est complété
        complete: ()=>{
          console.log("observable completé")
        },
      }
    )
  }

  ngOnDestroy(): void {
      // se désabonner de l'observable
      this.salutationSub.unsubscribe
      this.nombresPairsSub.unsubscribe
  }

}
