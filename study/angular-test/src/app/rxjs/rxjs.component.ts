import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})

export class RxjsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    const $input = <HTMLInputElement>document.querySelector('.todo-val');
    const $add = <HTMLInputElement>document.querySelector('.button-add');
    const input$ = Observable.fromEvent<KeyboardEvent>($input, 'keydown')
      .filter(r => r.keyCode === 13);
    const clickAdd$ = Observable.fromEvent<MouseEvent>($add, 'click');
    const app$ = input$.merge(clickAdd$)
      .map(() => { let t = $input.value; $input.value = ''; return t; })
      .filter(r => r !== '')
      .distinct()
      .switchMap(r => '')
      .map(r => '<div>' + r + '<div>')
      .do(r => console.log(r));

    app$.subscribe();
  }

}
