import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanFormComponent } from './action-plan-form.component';

describe('ActionPlanFormComponent', () => {
  let component: ActionPlanFormComponent;
  let fixture: ComponentFixture<ActionPlanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPlanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
