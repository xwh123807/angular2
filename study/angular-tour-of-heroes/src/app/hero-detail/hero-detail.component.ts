import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heorService: HeroService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params
      .switchMap((value: Params) => this.heorService.getHero2(value['id']))
      .subscribe(r => this.hero = r);
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.heorService.update(this.hero).subscribe(() => this.goBack());
  }
}
