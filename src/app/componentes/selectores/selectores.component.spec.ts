import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectoresComponent } from './selectores.component';

describe('SelectoresComponent', () => {
  let component: SelectoresComponent;
  let fixture: ComponentFixture<SelectoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
