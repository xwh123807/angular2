import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  private headers;

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl).toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHeroes2(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl).map((r) => { console.log(r); return r.json().data as Hero[]; });
  }

  getHero(id: number): Promise<Hero> {
    const url = '${this.heroesUrl}/${id}';
    return this.http.get(url).toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  getHero2(id: number): Observable<Hero> {
    const url = this.heroesUrl + '/' + id;
    return this.http.get(url).map(response => { console.log(response); return response.json().data as Hero; });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  create(name: string): Observable<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
      .map(res => res.json().data as Hero);
  }

  delete(id: number): Observable<void> {
    const url = this.heroesUrl + '/' + id;
    return this.http.delete(url, { headers: this.headers }).map(() => null);
  }

  update(hero: Hero): Observable<Hero> {
    const url = this.heroesUrl + '/' + hero.id;
    return this.http.put(url, JSON.stringify(hero), { headers: this.headers }).map(() => hero);
  }
}
