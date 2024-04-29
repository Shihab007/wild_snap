import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulDraftMessageComponent } from './successful-draft-message.component';

describe('SuccessfulDraftMessageComponent', () => {
  let component: SuccessfulDraftMessageComponent;
  let fixture: ComponentFixture<SuccessfulDraftMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulDraftMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulDraftMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
