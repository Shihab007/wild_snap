import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExamResultAddComponent } from './admin-exam-result-add.component';

describe('AdminExamResultAddComponent', () => {
  let component: AdminExamResultAddComponent;
  let fixture: ComponentFixture<AdminExamResultAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExamResultAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExamResultAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
