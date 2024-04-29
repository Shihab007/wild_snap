/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LandpageContentComponent } from './landpage-content.component';

describe('LandpageContentComponent', () => {
  let component: LandpageContentComponent;
  let fixture: ComponentFixture<LandpageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandpageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandpageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
