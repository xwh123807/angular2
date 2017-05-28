import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step73Component } from './step7-3.component';

describe('Step73Component', () => {
  let component: Step73Component;
  let fixture: ComponentFixture<Step73Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step73Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step73Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
