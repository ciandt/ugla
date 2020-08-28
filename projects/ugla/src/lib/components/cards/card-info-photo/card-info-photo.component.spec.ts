import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoPhotoComponent } from './card-info-photo.component';

describe('CardInfoPhotoComponent', () => {
  let component: CardInfoPhotoComponent;
  let fixture: ComponentFixture<CardInfoPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardInfoPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInfoPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
