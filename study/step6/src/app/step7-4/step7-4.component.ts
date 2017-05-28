import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step7-4',
  templateUrl: './step7-4.component.html',
  styleUrls: ['./step7-4.component.css']
})
export class Step74Component implements OnInit {
  heroes = ['a', 'b'];

  constructor() { }

  ngOnInit() {
  }

  add(value: string) {
    if (value) {
      this.heroes.push(value);
    }
  }
}
