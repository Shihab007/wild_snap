import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminClassRoutineComponent } from './app-admin-class-routine.component';

describe('AppAdminClassRoutineComponent', () => {
  let component: AppAdminClassRoutineComponent;
  let fixture: ComponentFixture<AppAdminClassRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdminClassRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAdminClassRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
