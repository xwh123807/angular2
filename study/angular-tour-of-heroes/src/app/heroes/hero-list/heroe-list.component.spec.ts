import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeListComponent } from './heroe-list.component';

describe('HeroeListComponent', () => {
  let component: HeroeListComponent;
  let fixture: ComponentFixture<HeroeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
