import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminExamRoutineComponent } from './app-admin-exam-routine.component';

describe('AppAdminExamRoutineComponent', () => {
  let component: AppAdminExamRoutineComponent;
  let fixture: ComponentFixture<AppAdminExamRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdminExamRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAdminExamRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
