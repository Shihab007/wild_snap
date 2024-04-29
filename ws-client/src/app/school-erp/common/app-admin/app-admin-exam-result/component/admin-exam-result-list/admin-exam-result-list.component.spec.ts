import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExamResultListComponent } from './admin-exam-result-list.component';

describe('AdminExamResultListComponent', () => {
  let component: AdminExamResultListComponent;
  let fixture: ComponentFixture<AdminExamResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExamResultListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExamResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
