import { Routes, RouterModule } from '@angular/router';
import { TodoService } from './services/todo.service';
import { TodoComponent } from './todo/todo.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from "@angular/core";
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { ContactComponent } from './contact/contact.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';

// les routes
export const ROUTES: Routes = [
  {path:'home', component: HomeComponent},
  {path:'', component: TodoComponent},
  {path:'todos', component: TodoComponent},
  {path:'detail/:id', component: SingleTodoComponent},
  {path: 'addTodo', component: AddTodoComponent},
  {path:'not-found', component: NotFoundComponent},
  // si tout ce qui es tavant ne marche pas faire ceci
  {path:'**', pathMatch:'full', redirectTo: 'not-found'},
]

// ce module permet de visualiser son modul en question
@NgModule({
  declarations: [
    // les components que je veux dans ce module
    AppComponent,
    TodoComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    SingleTodoComponent,
    ContactComponent,
    AddTodoComponent
  ],
  imports: [
    // les modules dont lapplication aura besoin pour fonctionner
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  // importer les services
  providers: [
    TodoService
  ],
  bootstrap:[
    // lelement sur lequel lapplication angular va demarer
    AppComponent,
  ]
})


//exporter le module c'est tres important
export class AppModule { }

