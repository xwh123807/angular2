import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeroSearchService {

  constructor(private http: Http) { }

  search(term: string): Observable<Hero[]> {
    return this.http.get('app/heroes/?name=' + term)
      .map(r => r.json().data as Hero[]);
  }
}
