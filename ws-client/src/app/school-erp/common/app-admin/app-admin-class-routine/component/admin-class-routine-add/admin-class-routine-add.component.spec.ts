import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassRoutineAddComponent } from './admin-class-routine-add.component';

describe('AdminClassRoutineAddComponent', () => {
  let component: AdminClassRoutineAddComponent;
  let fixture: ComponentFixture<AdminClassRoutineAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClassRoutineAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClassRoutineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
