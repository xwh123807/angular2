import { HeroService } from './hero.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
  providers: [
    HeroService
  ]
})
export class HerosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
