import { Todo } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// pouvoir utilise le service
// @Injectable({
//   providedIn: AppModule et importer le module !
// })
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  today = new Date()
  todos! : Todo[]
  lastUpdate!:any
  //lastUpdate2! : any

  //observable
  todosSubject = new Subject<any[]>()

  constructor() {

    //methode observable
    setTimeout(()=>{
      this.todos = [
        {
          name: 'karim',
          todoStatus: false,
          isModif: false

        },
        {
          name: 'karim',
          todoStatus: false,
          isModif: false

        }
      ];
      this.emitTodos();
    }, 3000)

    // methode 1
    this.lastUpdate = Promise.resolve(new Date())
    //this.lastUpdate2 = Promise.reject('Pas de données disponibles actuellement')

    //methode 2
    // en cas de success resolve est executé
    // en cas de echec reject est executé
    // this.todos = new Promise((resolve,reject)=>{
    //   // recuperer des donnes auprès du serveur
      // const data  = [
      //   {
      //     name: 'karim',
      //     todoStatus: false,
      //     isModif: false

      //   },
      //   {
      //     name: 'karim',
      //     todoStatus: false,
      //     isModif: false

      //   }
      // ];
    //   //tester si la data existe
    //   if(data.length){
    //     setTimeout(()=>{
    //       this.todos = data
    //       resolve(data);
    //     }, 2000)
    //   }else{
    //     reject("pas de donnée disponibles sur le serveur")
    //   }
    // })
   }

   emitTodos(){
     this.todosSubject.next(this.todos)
   }

  onChangeStatus(i : number){
    this.todos[i].todoStatus = !this.todos[i].todoStatus
    this.emitTodos()
  }

  modifier(i: number){
    this.todos[i].isModif = !this.todos[i].isModif
    this.emitTodos()
  }

  getTodo(index: number){
    if(this.todos[index]){
      return this.todos[index]
    }
    return false
  }

  addTodo(todo : Todo) : void{
    //this.todos.push(todo)
    this.todos.unshift(todo) // add en premier
    this.emitTodos()
   }
}
