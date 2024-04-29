import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExamRoutineAddComponent } from './admin-exam-routine-add.component';

describe('AdminExamRoutineAddComponent', () => {
  let component: AdminExamRoutineAddComponent;
  let fixture: ComponentFixture<AdminExamRoutineAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExamRoutineAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExamRoutineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
