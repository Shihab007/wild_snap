import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminClassRoomComponent } from './app-admin-class-room.component';

describe('AppAdminClassRoomComponent', () => {
  let component: AppAdminClassRoomComponent;
  let fixture: ComponentFixture<AppAdminClassRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdminClassRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAdminClassRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
