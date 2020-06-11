import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelSpanComponent } from './label-span.component';

describe('LabelSpanComponent', () => {
  let component: LabelSpanComponent;
  let fixture: ComponentFixture<LabelSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
