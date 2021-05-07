import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { CustomersFormsComponent } from '../../customers/customers-forms/customers-forms.component';
import { DocumentItemComponent } from '../document-item/document-item.component';

@Component({
  selector: 'app-docuemnts-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.css']
})
export class DocumentsFormComponent implements OnInit {
  documentScopes = [];
  documentsStatus = [];
  documentData: any;
  documentsItem = [];
  public documentForm: FormGroup;

  columns2 = [{ prop: 'name', name: 'Nome do documento' }, { prop: 'dt', name: 'Data de upload' }];
  rows2 = [
    { name: 'Lei 75.pdf', dt: '15/01/2021' },
    { name: 'Lei 90.pdf', dt: '16/02/2021' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomersFormsComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private snackBar: MatSnackBar,
    private confirm: AppConfirmService,
    public dialog: MatDialog,
  ) { }

  prepareScreen(record) {
    this.documentForm = new FormGroup({
      document_id: new FormControl(record.document_id),
      document_scope_id: new FormControl(record.document_scope_id, [Validators.required]),
      document_type: new FormControl(record.document_type, [Validators.required]),
      document_number: new FormControl(record.document_number, [Validators.required]),
      document_date: new FormControl(new Date(record.document_date), [Validators.required]),
      document_status_id: new FormControl(record.document_status_id, [Validators.required]),
      document_summary: new FormControl(record.document_summary, [Validators.required])      
    });
    this.documentData = new Date(record.document_date);
    this.getDocumentScopes();
    this.getDocumentStatus();
    this.getItems(record.document_id);


  }

  getDocumentStatus() {
    this.crudService.GetParams(undefined, "/documentstatus").subscribe(res => {
      if (res.status == 200) {
        this.documentsStatus = [];
        this.documentsStatus = res.body;
      }
    });
  }

  getDocumentScopes() {    
    this.crudService.GetParams(undefined, "/documentscope").subscribe(res => {
      if (res.status == 200) {
        this.documentScopes = [];
        this.documentScopes = res.body;
      }
    });    
  }

  ngOnInit() {
    this.prepareScreen(this.data.payload);
  }

  saveDocument() {
    let form = this.documentForm.value;
    this.loader.open();
    this.crudService.Save(form, this.data.new, "/document", form.document_id).subscribe(res => {
      if (res.status == 200) {
        this.loader.close();
        this.snackBar.open("Registro gravado com sucesso", "", { duration: 3000 });
        this.dialogRef.close('OK');
      } else {
        this.loader.close();
        this.snackBar.open("Erro ao gravar registro:" + res.Message, "", { duration: 5000 });
        this.dialogRef.close('NOK');
      }
    });
  }
  
  newItem() {   
    let dialogRef: MatDialogRef<any> = this.dialog.open(DocumentItemComponent, {
      width: '900px',
      disableClose: true,
      data: { title: "Novo Item do documento", payload: this.data.payload.document_id, new: true }
    });

    dialogRef.afterClosed()
    .subscribe(res => {      
      this.getItems(this.data.payload.document_id);
      return;
    });
  }

  getItems(documentId) {
    this.crudService.GetParams({"orderby":"document_item_order", "direction":"asc"}, "/documentitem/items/"+documentId).subscribe(res => {
      if (res.status == 200) {
        this.documentsItem = [];
        this.documentsItem = res.body;
      }
      
    });  
  }

}
