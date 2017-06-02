import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../hero.service';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      providers: [
        HeroService,
        {
          provider: ActivatedRoute,
          useValue: {

          }
        },
        {
          provider: Router,
          useValue: {

          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

export class Test {

}
