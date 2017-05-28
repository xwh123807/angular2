import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step7-3',
  templateUrl: './step7-3.component.html',
  styleUrls: ['./step7-3.component.css']
})
export class Step73Component implements OnInit {
  value = '';

  constructor() { }

  ngOnInit() {
  }

  onEnter(value: string) {
    this.value = value;
  }
}
