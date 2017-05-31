import { Hero } from './../hero';
import { HeroService } from '../hero.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroe-list.component.html',
  styleUrls: ['./heroe-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes: Hero[];

  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
  ngOnInit(): void {
    this.heroService.getHeroes2().subscribe(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.create(name)
      .subscribe(hero => { this.heroes.push(hero); this.selectedHero = null });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id).subscribe(() => {
      this.heroes = this.heroes.filter(f => f !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    });
  }
}
