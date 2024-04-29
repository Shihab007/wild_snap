import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExamRoutineListComponent } from './admin-exam-routine-list.component';

describe('AdminExamRoutineListComponent', () => {
  let component: AdminExamRoutineListComponent;
  let fixture: ComponentFixture<AdminExamRoutineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExamRoutineListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExamRoutineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
