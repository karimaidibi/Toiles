import { TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit {

  todo!: any
  error!: String
  constructor(private route: ActivatedRoute,
    private todoService: TodoService) {

     }

  ngOnInit(): void {
    // le plus pour convertir str en nombre
    const id = +this.route.snapshot.params['id']
    this.todo = this.todoService.getTodo(id);
    if(this.todo === false){
      this.error = "produit non existant"
    }
  }

}
