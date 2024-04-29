import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExamListComponent } from './admin-exam-list.component';

describe('AdminExamListComponent', () => {
  let component: AdminExamListComponent;
  let fixture: ComponentFixture<AdminExamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
