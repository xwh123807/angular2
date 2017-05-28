import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step7-2',
  templateUrl: './step7-2.component.html',
  styleUrls: ['./step7-2.component.css']
})
export class Step72Component implements OnInit {
  values = '';

  constructor() { }

  ngOnInit() {
  }

  onKey(value: string) {
    this.values += value + ' | ';
  }
}
