import { LoggerService } from './logger.service';
import { Injectable } from '@angular/core';

import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  constructor(private logger: LoggerService) { }

  getHeroes() {
    this.logger.log('Getting heroes');
    return HEROES;
  };
}
