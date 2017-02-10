import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HeroService {
  private heroUrl = 'app/heroes';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroUrl).toPromise().then(response => response.json().data as Hero[]).catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve => setTimeout(resolve, 2000)).then(() => this.getHeroes);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }

  update(hero: Hero): Promise<Hero> {
    const url = '${this.heroUrl}/${hero.id}';
    return this.http.put(url, JSON.stringify(hero), { headers: this.headers }).toPromise().then(() => hero).catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http.post(this.heroUrl, JSON.stringify({ name: name }),
      { headers: this.headers }).toPromise().then(response => response.json().data).catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = '${this.heroUrl}/${id}';
    return this.http.delete(url, { headers: this.headers }).toPromise().then(() => null).catch(this.handleError);
  }
}
