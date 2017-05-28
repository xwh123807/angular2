import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step74Component } from './step7-4.component';

describe('Step74Component', () => {
  let component: Step74Component;
  let fixture: ComponentFixture<Step74Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step74Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step74Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
