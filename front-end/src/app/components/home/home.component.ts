import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  image1 = "/assets/images/nature_morte_1.PNG";
  image2 = "/assets/images/nu_2.PNG"
  image3 = "/assets/images/oiseau.PNG"

  constructor() { }

  ngOnInit(): void {
  }

}
