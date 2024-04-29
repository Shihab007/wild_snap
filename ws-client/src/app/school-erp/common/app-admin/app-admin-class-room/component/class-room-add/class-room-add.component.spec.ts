import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomAddComponent } from './class-room-add.component';

describe('ClassRoomAddComponent', () => {
  let component: ClassRoomAddComponent;
  let fixture: ComponentFixture<ClassRoomAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassRoomAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassRoomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
