import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminExamComponent } from './app-admin-exam.component';

describe('AppAdminExamComponent', () => {
  let component: AppAdminExamComponent;
  let fixture: ComponentFixture<AppAdminExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdminExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAdminExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
