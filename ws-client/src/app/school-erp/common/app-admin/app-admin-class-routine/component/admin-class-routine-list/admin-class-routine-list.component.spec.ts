import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassRoutineListComponent } from './admin-class-routine-list.component';

describe('AdminClassRoutineListComponent', () => {
  let component: AdminClassRoutineListComponent;
  let fixture: ComponentFixture<AdminClassRoutineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClassRoutineListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClassRoutineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
