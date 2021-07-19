import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';

@Component({
  selector: 'app-documents-attachement-form',
  templateUrl: './documents-attachement-form.component.html',
  styleUrls: ['./documents-attachement-form.component.css']
})
export class DocumentsAttachementFormComponent implements OnInit {

  public attachmentForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DocumentsAttachementFormComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.prepareScreen(this.data.payload);
  }

  prepareScreen(record) {
    this.attachmentForm = new FormGroup({
      attachment_description: new FormControl('', [Validators.required]),
      attachment_file: new FormControl('', [Validators.required]),
      document_id: new FormControl(record.document_id, [Validators.required])
    });
  }

  fileChange(event) {
    this.attachmentForm.controls['attachment_file'].setValue(event.target.files[0]);    
  }

  saveAttachment() {
    let attachment = this.attachmentForm.value;
    let formData = new FormData();
    formData.append('attachment_description', attachment.attachment_description);
    formData.append('attachment_file', attachment.attachment_file);
    formData.append('document_id', attachment.document_id);
    
    this.loader.open();
    this.crudService.Save(formData, true, "/document-attachment", null).subscribe(res => {
      this.loader.close();
      this.snackBar.open("Added an attachment successfully", "", { duration: 3000 });
      this.dialogRef.close("OK");
    })
  }

}
