import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosordenComponent } from './filtrosorden.component';

describe('FiltrosordenComponent', () => {
  let component: FiltrosordenComponent;
  let fixture: ComponentFixture<FiltrosordenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosordenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosordenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
