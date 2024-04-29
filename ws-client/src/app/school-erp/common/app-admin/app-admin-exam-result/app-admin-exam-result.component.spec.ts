import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminExamResultComponent } from './app-admin-exam-result.component';

describe('AppAdminExamResultComponent', () => {
  let component: AppAdminExamResultComponent;
  let fixture: ComponentFixture<AppAdminExamResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdminExamResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAdminExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
