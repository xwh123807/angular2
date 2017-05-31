import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrsisCenterHomeComponent } from './crsis-center-home.component';

describe('CrsisCenterHomeComponent', () => {
  let component: CrsisCenterHomeComponent;
  let fixture: ComponentFixture<CrsisCenterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrsisCenterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrsisCenterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
