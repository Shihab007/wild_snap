import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuardianListComponent } from './admin-guardian-list.component';

describe('AdminGuardianListComponent', () => {
  let component: AdminGuardianListComponent;
  let fixture: ComponentFixture<AdminGuardianListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGuardianListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGuardianListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
