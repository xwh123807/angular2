import { Hero, HeroService } from '../hero.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(private route: ActivatedRoute, private service: HeroService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.service.getHero(+params['id']))
      .subscribe(r => this.hero = r);
  }

  gotoHeroes() {
    const heroId = this.hero ? this.hero.id : null;
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }
}
