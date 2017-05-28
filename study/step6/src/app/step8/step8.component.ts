import { Hero } from './hero';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step8',
  templateUrl: './step8.component.html',
  styleUrls: ['./step8.component.css']
})
export class Step8Component implements OnInit {
  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chunk Overstreet');

  submitted = false;

  constructor() { }

  ngOnInit() {
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  onSubmit() {
    this.submitted = true;
  }

  newHero() {
    this.model = new Hero(42, '', '');
  }
}
