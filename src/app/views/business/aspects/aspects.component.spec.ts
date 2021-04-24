import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectsComponent } from './aspects.component';

describe('AspectsComponent', () => {
  let component: AspectsComponent;
  let fixture: ComponentFixture<AspectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AspectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
