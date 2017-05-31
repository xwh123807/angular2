import { Hero } from './../hero';
import { HeroSearchService } from '../hero-search.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;

  private searchTerms = new Subject<string>();

  constructor(private heroSearchService: HeroSearchService, private router: Router) { }

  ngOnInit() {
    this.heroes = this.searchTerms.debounceTime(300).distinctUntilChanged()
      .filter(t => t !== '')
      .switchMap(term => this.heroSearchService.search(term));
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
