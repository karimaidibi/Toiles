import { Subscription } from 'rxjs';
import { TodoService } from './../services/todo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

  //declaration des donnes a utiliser depuis le service
  today!: Date;
  todos!: any;
  lastUpdate!: any;
  todoSubject!: Subscription;

  constructor(private todoService: TodoService,
    private router: Router) {
   }

  ngOnInit(): void {
    this.today = this.todoService.today;
    this.todoSubject = this.todoService.todosSubject.subscribe(
      {
        next: (value: any[])=>{
          this.todos = value
        },
        error: (e)=>{
          console.log('Erreur : ', e)
        },
        complete: ()=>{
          console.log('Observable complete ')
        }
      }
    );

    this.todoService.emitTodos();
    //promise
    // this.todoService.todos
    // .then((data: any)=>{
    //   this.todos = data
    // })
    // .catch((err : any)=>{
    //   this.router.navigate(['not-found'])
    //   console.log(err)
    // })

    this.todoService.lastUpdate.then((data : any)=>{
      this.lastUpdate = data
    })
    .catch((err : any)=>{
      this.router.navigate(['not-found'])
      console.log(err)
    })
  }

  ngOnDestroy(): void {
      this.todoSubject.unsubscribe
  }

  onChangeStatus(i : number){
    this.todoService.onChangeStatus(i)
  }

  modifier(i: number){
    this.todoService.modifier(i)
  }

  onView(i: number){
    this.router.navigate(["detail",i])
  }



}
