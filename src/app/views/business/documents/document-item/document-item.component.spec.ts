import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentItemComponent } from './document-item.component';

describe('DocumentItemComponent', () => {
  let component: DocumentItemComponent;
  let fixture: ComponentFixture<DocumentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
