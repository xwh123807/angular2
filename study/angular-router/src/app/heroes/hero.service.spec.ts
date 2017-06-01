import { TestBed, inject } from '@angular/core/testing';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService]
    });
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it('get Heroes', inject([HeroService], (service: HeroService) => {
    service.getHeroes().then(heroes => {
      expect(heroes).toBeTruthy();
    });
  }));

  it('get Heroe id[11]', inject([HeroService], (service: HeroService) => {
    service.getHero(11).then(hero => {
      expect(hero).toBeTruthy();
      expect(hero.id).toBe(11);
      expect(hero.name).toBe('Mr. Nice');
    });
  }));
});
