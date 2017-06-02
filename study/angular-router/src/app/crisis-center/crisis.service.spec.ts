import { TestBed, inject } from '@angular/core/testing';

import { CrisisService } from './crisis.service';

describe('CrisisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrisisService]
    });
  });

  it('should be created', inject([CrisisService], (service: CrisisService) => {
    expect(service).toBeTruthy();
  }));

  it('findAll', inject([CrisisService], (service: CrisisService) => {
    expect(service).toBeTruthy();
    service.getCrises().then(r => {
      expect(r).toBeTruthy();
      expect(r.length).toBe(4);
    });
  }));

  it('find one', inject([CrisisService], (service: CrisisService) => {
    expect(service).toBeTruthy();
    service.getCrisis(3).then(r => {
      expect(r).toBeTruthy();
      expect(r.id).toBe(3);
      expect(r.name).toBe('Giant Asteroid Heading For Earth');
    });
  }));

  it('add and find', inject([CrisisService], (service: CrisisService) => {
    expect(service).toBeTruthy();
    let name = 'new crisis';
    service.addCrisis(name).then(r => {
      expect(r).toBeTruthy();
      expect(r.id).toBe(100);
      expect(r.name).toBe(name);
    });
  }));
});

export class Test {
}
