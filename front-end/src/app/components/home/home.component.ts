import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  image1 = "http://localhost:3000/images/toiles/volcan.PNG";
  image2 = "http://localhost:3000/images/toiles/tryptique_alger.PNG"
  image3 = "http://localhost:3000/images/toiles/vieux.PNG"

  constructor() { }

  ngOnInit(): void {
  }

}
