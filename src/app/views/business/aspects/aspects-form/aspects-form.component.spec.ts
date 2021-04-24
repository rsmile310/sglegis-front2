import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectsFormComponent } from './aspects-form.component';

describe('AspectsFormComponent', () => {
  let component: AspectsFormComponent;
  let fixture: ComponentFixture<AspectsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AspectsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AspectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
