import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { dialog } from 'app/models/size/size';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { ThemeService } from 'app/services/theme/theme.service';
import { CustomersFormsComponent } from '../../customers/customers-forms/customers-forms.component';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { DocumentsAttachementFormComponent } from '../documents-attachement-form/documents-attachement-form.component';
// import { FileInputComponent } from 'ngx-material-file-input';
import * as moment from "moment";
import { roles } from 'app/models/auth/roles';
import { AuthGuard } from 'app/services/auth/auth.guard';
import { profile } from 'app/models/auth/profile.types';

import { environment } from "environments/environment";

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
  states = [];
  cities = [];
  public documentForm: FormGroup;
  showState: boolean = false;
  showCity: boolean = false;


  columns2 = [{ prop: 'name', name: 'Nome do documento' }, { prop: 'dt', name: 'Data de upload' }];

  documentAttachments = [
    // { name: 'Lei 75.pdf', dt: '15/01/2021' },
    // { name: 'Lei 90.pdf', dt: '16/02/2021' }
  ];
  currentUser:any;
  roles = roles;
  profile = profile;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomersFormsComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private snackBar: MatSnackBar,
    private confirm: AppConfirmService,
    public dialog: MatDialog,
    private auth: AuthGuard,
  ) { }

  prepareScreen(record) {
    this.documentForm = new FormGroup({
      document_id: new FormControl(record.document_id),
      document_scope_id: new FormControl(record.document_scope_id, [Validators.required]),
      document_type: new FormControl(record.document_type, [Validators.required]),
      document_number: new FormControl(record.document_number, [Validators.required]),
      document_date: new FormControl(record.document_date, [Validators.required]),
      document_status_id: new FormControl(record.document_status_id, [Validators.required]),
      document_summary: new FormControl(record.document_summary, [Validators.required]),
      document_state_id: new FormControl(record.document_state_id),
      document_city_id: new FormControl(record.document_city_id),
      document_file: new FormControl()
    });
    
    this.documentForm.controls.document_date.setValue( formatDate( record.document_date ? new Date(record.document_date) : new Date(), "dd/MM/yyyy", "pt_br") );
    this.documentData = new Date(record.document_date);
    this.getDocumentScopes();
    this.getDocumentStatus();
    this.getItems(record.document_id);
    this.getAttachments(record.document_id);


    this.documentForm.controls.document_scope_id.valueChanges.subscribe(r => {
      this.prepareStatesCities(r);
    });
    this.prepareStatesCities(this.documentForm.controls.document_scope_id.value);

  }

  prepareStatesCities(r) {
    switch (r) {
      case 1:
        this.hideCity();
        this.hideState();
        break;
      case 2:
        this.hideCity();
        this.showStates();
        break;
      case 3:
        this.showStates();
        this.showCities();
        break;
      default:
        console.log("");
    }
  }



  hideState() {
    this.showState = false;
    this.states = [];
    this.documentForm.controls.document_state_id.clearValidators();
  }

  hideCity() {
    this.showCity = false;
    this.cities = [];
    this.documentForm.controls.document_city_id.clearValidators();

  }

  showStates() {
    this.showState = true;
    this.documentForm.controls.document_state_id.setValidators([Validators.required]);
    this.crudService.GetParams({ "orderby": "state_name" }, "/state").subscribe(res => {
      if (res.status == 200) {
        this.states = [];
        this.states = res.body;
      }
    });
  }

  showCities() {
    this.showCity = true;
    this.documentForm.controls.document_city_id.setValidators([Validators.required]);

    this.documentForm.controls.document_state_id.valueChanges.subscribe(res => {
      let p: any = new Object();
      p.orderby = "city_name";
      p.direction = "asc";
      p.state_id = res;
      if (this.showCity) {
        this.crudService.GetParams(p, "/city").subscribe(c => {
          if (c.status == 200) {
            this.cities = [];
            this.cities = c.body;
          }
        });
      }
    });
    if (this.documentForm.controls.document_state_id.value) {
      let p: any = new Object();
      p.orderby = "city_name";
      p.direction = "asc";
      p.state_id = this.documentForm.controls.document_state_id.value;
      this.crudService.GetParams(p, "/city").subscribe(c => {
        if (c.status == 200) {
          this.cities = [];
          this.cities = c.body;
        }
      });
    }
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
    this.currentUser = this.auth.getUser();
    this.prepareScreen(this.data.payload);
  }

  saveDocument() {
    let form = this.documentForm.value;
    form.document_date = Date.parse(form.document_date);
    this.loader.open();
    this.crudService.Save(form, this.data.new, "/document", form.document_id).subscribe(res => {
      if (res.status == 200) {
        this.documentForm.controls['document_id'].setValue(res.body.document_id);
        this.data.new = false;
        
        this.loader.close();
        this.snackBar.open("Registro gravado com sucesso", "", { duration: 3000 });
        //this.dialogRef.close('OK');
        this.documentForm.controls.document_id.setValue(res.body.document_id);
      } else {
        this.loader.close();
        this.snackBar.open("Erro ao gravar registro:" + res.Message, "", { duration: 5000 });
        this.documentForm.controls.document_id.setValue(res.body.document_id);
        //this.dialogRef.close('NOK');
      }
    });
  }

  editItem(row) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(DocumentItemComponent, {
      width: '900px',
      disableClose: true,
      data: { title: "Editar item: " + row.document_item_id, payload: row, new: false }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        this.getItems(this.data.payload.document_id);
        return;
      });
  }

  newItem() {
    let dialogRef: MatDialogRef<any> = this.dialog.open(DocumentItemComponent, {
      width: '900px',
      disableClose: true,
      data: { title: "Novo Item do documento", payload: this.documentForm.value, new: true }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        this.getItems(this.documentForm.value.document_id);
        return;
      });
  }

  getItems(documentId) {
    this.crudService.GetParams({ "orderby": "document_item_order", "direction": "asc" }, "/documentitem/items/" + documentId).subscribe(res => {
      if (res.status == 200) {
        this.documentsItem = [];
        this.documentsItem = res.body;
      }

    });
  }

  newAttachment() {
    let dialogRef: MatDialogRef<any> = this.dialog.open(DocumentsAttachementFormComponent, {
      width: dialog.small,
      disableClose: true,
      data: { title: "New Attachment to document", payload: this.documentForm.value, new: true }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getAttachments(this.documentForm.value.document_id);
      return;
    })
  }

  getAttachments(documentId) {
    if (documentId)
    this.crudService.GetParams({ "orderby": "createdAt", "direction": "asc" }, "/document-attachment/attachments/" + documentId).subscribe(res => {
      if (res.status == 200) {
        this.documentAttachments = [];
        this.documentAttachments = res.body.map(att => {
          const date = moment(att.createdAt);          
          return {
            ...att,
            date: date.format('DD/MM/yyyy')
          }
        });                
      }
    });
  }

  removeAttachment(attachment) {
    let attachmentData = attachment.attachment_id;
    
    this.confirm.confirm("Delete Attachment", "Are you sure to delete an Attachment? " + attachmentData).subscribe(result => {
      if (result === true) {
        this.loader.open();
        this.crudService.DeleteParams(attachmentData, "/document-attachment").subscribe(res => {
          this.snackBar.open("An attachment has been deleted successfully!", "", { duration: 3000 });
          this.getAttachments(this.documentForm.value.document_id);
          this.loader.close();
        }, err => {
          this.loader.close();
          this.snackBar.open("Error in deleting attachment: " + err, "", { duration: 5000 });
        })
      }
    })
  }

  deleteDocument() {
    let document = this.documentForm.value;
    
    this.confirm.confirm("Delete Document", "Are you sure to delete a Document? " + document.document_id).subscribe(result => {
      if (result === true) {
        this.loader.open();
        this.crudService.DeleteParams(document.document_id, "/document").subscribe(res => {
          this.snackBar.open("A Document has been deleted successfully!", "", { duration: 3000 });
          this.loader.close();
          this.dialogRef.close("OK");
        }, err => {
          this.loader.close();
          this.snackBar.open("Error in deleting document: " + err, "", { duration: 5000 });
        })
      }
    })
  }

  downloadAttachment(data) {
    window.open(`${environment.fileURL}/${data.attachment_src}`);
  }

}
