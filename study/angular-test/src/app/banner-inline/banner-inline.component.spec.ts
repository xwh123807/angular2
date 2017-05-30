import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BannerInlineComponent } from './banner-inline.component';
import { DebugElement } from '@angular/core';

describe('BannerInlineComponent', () => {
  let component: BannerInlineComponent;
  let fixture: ComponentFixture<BannerInlineComponent>;
  let doc: HTMLElement;
  let dl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BannerInlineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dl = fixture.debugElement;
    doc = dl.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component title', () => {
    expect(component.title).toEqual('Test Tour of Heroes');
  });

  it('html title', () => {
    expect(doc.querySelector("h1").textContent).toContain('Test Tour of Heroes');
  })

  it('html title by css', () => {
    expect(dl.query(By.css('h1')).nativeElement.textContent).toContain('Test Tour of Heroes');
  });

  it('html title by class', () => {
    expect(dl.query(By.css('.title')).nativeElement.textContent).toContain('Test Tour of Heroes');
  });
});
