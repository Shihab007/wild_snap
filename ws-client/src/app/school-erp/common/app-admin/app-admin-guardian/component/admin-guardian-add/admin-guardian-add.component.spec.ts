import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuardianAddComponent } from './admin-guardian-add.component';

describe('AdminGuardianAddComponent', () => {
  let component: AdminGuardianAddComponent;
  let fixture: ComponentFixture<AdminGuardianAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGuardianAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGuardianAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
