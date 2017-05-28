import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.css']
})
export class Step7Component implements OnInit {
  clickMessage = '';

  values = '';

  constructor() { }

  ngOnInit() {
  }

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }

  onKey(event: KeyboardEvent) {
    this.values += (<HTMLInputElement>event.target).value + ' | ';
    console.info(event);
  }
}
