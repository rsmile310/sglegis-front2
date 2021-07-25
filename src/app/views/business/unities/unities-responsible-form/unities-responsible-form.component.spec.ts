import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitiesResponsibleFormComponent } from './unities-responsible-form.component';

describe('UnitiesResponsibleFormComponent', () => {
  let component: UnitiesResponsibleFormComponent;
  let fixture: ComponentFixture<UnitiesResponsibleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitiesResponsibleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitiesResponsibleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
