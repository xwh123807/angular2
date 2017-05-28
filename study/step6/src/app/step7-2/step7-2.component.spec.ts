import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step72Component } from './step7-2.component';

describe('Step72Component', () => {
  let component: Step72Component;
  let fixture: ComponentFixture<Step72Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step72Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step72Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
