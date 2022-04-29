import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersOrderComponent } from './filters-order.component';

describe('FiltrosordenComponent', () => {
  let component: FiltersOrderComponent;
  let fixture: ComponentFixture<FiltersOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
