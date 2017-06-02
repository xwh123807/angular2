import { Injectable } from '@angular/core';

export class Crisis {
  constructor(public id: number, public name: string) { }
}

const CRISES = [
  new Crisis(1, 'Dragon Burning Cities'),
  new Crisis(2, 'Sky Rains Great White Sharks'),
  new Crisis(3, 'Giant Asteroid Heading For Earth'),
  new Crisis(4, 'Procrastinators Meeting Delayed Again')
];

const crisesPromise: Promise<Crisis[]> = Promise.resolve(CRISES);

@Injectable()
export class CrisisService {
  static nextCrisisId = 100;

  constructor() { }

  getCrises(): Promise<Crisis[]> {
    return crisesPromise;
  }

  getCrisis(id: number): Promise<Crisis> {
    return this.getCrises().then(r => r.find(item => item.id === id));
  }

  addCrisis(name: string): Promise<Crisis> {
    name = name.trim();
    if (name) {
      const crisis = new Crisis(CrisisService.nextCrisisId++, name);
      return crisesPromise.then(r => { r.push(crisis); return crisis });
    }
  }
}
