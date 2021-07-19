import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsAttachementFormComponent } from './documents-attachement-form.component';

describe('DocumentsAttachementFormComponent', () => {
  let component: DocumentsAttachementFormComponent;
  let fixture: ComponentFixture<DocumentsAttachementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsAttachementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsAttachementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
