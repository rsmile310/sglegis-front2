import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { CustomersFormsComponent } from '../../customers/customers-forms/customers-forms.component';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  documentsStatus = [];
  areas = [];
  aspects = [];
  areasWithAspects = [];
  public documentItemForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomersFormsComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private snackBar: MatSnackBar,
    private confirm: AppConfirmService,
    public dialog: MatDialog) { }

  prepareScreen(record) {
    this.documentItemForm = new FormGroup({
      document_item_id: new FormControl(record.document_item_id),
      document_item_subject: new FormControl(record.document_item_subject, [Validators.required]),
      document_item_number: new FormControl(record.document_item_number, [Validators.required]),
      document_item_order: new FormControl(record.document_item_order, [Validators.required]),
      document_item_status_id: new FormControl(record.document_item_status_id, [Validators.required]),
      document_item_description: new FormControl(record.document_item_description, [Validators.required]),
      document_item_observation: new FormControl(record.document_item_observation, [Validators.required]),
      document_id: new FormControl(this.data.payload, [Validators.required])
    });

    this.getDocumentStatus();
    this.getAreasAspects();
  }

  getAreasAspects() {
    this.crudService.GetParams(undefined, "/area").subscribe(res => {
      if (res.status == 200) {
        this.areas = [];
        this.areas = res.body;

        this.crudService.GetParams(undefined, "/areaaspect").subscribe(asps => {
          if (asps.status == 200) {
            this.aspects = [];
            this.aspects = asps.body;
            this.mountAreasAspects();
          }
        });
      }
    });
  }

  mountAreasAspects() {
    this.areasWithAspects = [];    
    for (let i = 0; i < this.areas.length; i++) {
      let auxAspects = []
      for (let j = 0; j < this.aspects.length; j++) {
        auxAspects.push({ "area_aspect_id": this.aspects[j].area_aspect_id, "area_aspect_name": this.aspects[j].area_aspect_name, "status": "N" });
      }
      this.areasWithAspects.push({ "area_id": this.areas[i].area_id, "area_name": this.areas[i].area_name, "aspects": auxAspects });
    }
  }

  toggleAll(arearWithAspect, evento) {
    if (evento.checked) {
      for (let i = 0; i < arearWithAspect.aspects.length; i++) {
        arearWithAspect.aspects[i].status = 'S';
      }
    } else {
      for (let i = 0; i < arearWithAspect.aspects.length; i++) {
        arearWithAspect.aspects[i].status = 'N';
      }      
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

  saveDocumentItem() {
    let form = this.documentItemForm.value;
    this.loader.open();
    this.crudService.Save(form, this.data.new, "/documentitem", form.document_id).subscribe(res => {
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

  getAreas() {
    this.crudService.GetParams(undefined, "/area").subscribe(res => {
      if (res.status == 200) {
        this.areas = [];
        this.areas = res.body;
      }
    });
  }

  getAspects() {
    this.crudService.GetParams(undefined, "/areaaspect").subscribe(res => {
      if (res.satus == 200) {
        this.aspects = [];
        this.aspects = res.body;
      }
    });
  }

  ngOnInit() {
    this.prepareScreen(this.data.payload);
  }

}
