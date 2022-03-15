import { Router } from '@angular/router';
import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todo = new Todo();

  constructor(private todoService : TodoService,
    private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    this.todoService.addTodo(this.todo);
    this.router.navigate(["todos"])
  }

}
