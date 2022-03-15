// la logique du component
import { Component } from '@angular/core';

// @ est un decorateur, ici on importe component de angular pour que typesceript le reconnait
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // on a la pissibilt de rajouter plusieurs url css d ou le tableau
  styleUrls: ['./app.component.css']
})

// exporter directement ce component
export class AppComponent {
  title = 'front-end';
}
