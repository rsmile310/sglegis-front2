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
      document_item_observation: new FormControl(record.document_item_observation),
      document_id: new FormControl(record.document_id, [Validators.required])
    });

    this.getDocumentStatus();
    this.getAreasWithAspects(record.document_item_id);
  }

  getAreasWithAspects(document_item_id) {
    this.crudService.GetParams(undefined, `/documentitem/${document_item_id||"0"}/aspects`).subscribe(asps => {
      if (asps.status == 200) {
        this.areasWithAspects = [];
        this.areasWithAspects = asps.body;
      }
    });
  }

  showValue() {
    return JSON.stringify(this.documentItemForm.value)
  }

  toggleAll(arearWithAspect, evento) {
    for (let i = 0; i < arearWithAspect.aspects.length; i++) {
      arearWithAspect.aspects[i].checked = (evento.checked) ? "S" : "N";
    }
  }

  toggle(aspect, evento) {
    aspect.checked = (evento.checked) ? "S" : "N";
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
    this.crudService.Save(form, this.data.new, "/documentitem", form.document_item_id).subscribe(res => {
      if (res.status == 200) {
        this.loader.close();
        this.saveAreasAspects(res.body.document_item_id || form.document_item_id).then(r => {
          this.snackBar.open("Registro gravado com sucesso", "", { duration: 3000 });
          this.dialogRef.close('OK');
        })
      } else {
        this.loader.close();
        this.snackBar.open("Erro ao gravar registro:" + res.Message, "", { duration: 5000 });
        this.dialogRef.close('NOK');
      }
    });
  }

  async saveAreasAspects(document_item_id) {
    for (let i = 0; i < this.areasWithAspects.length; i++) {
      for (let j = 0; j < this.areasWithAspects[i].aspects.length; j++) {
        if (this.areasWithAspects[i].aspects[j].checked != this.areasWithAspects[i].aspects[j].previous) {
          if (this.areasWithAspects[i].aspects[j].checked == "S") {
            let o: any = new Object();
            o.area_id = this.areasWithAspects[i].area_id;
            o.area_aspect_id = this.areasWithAspects[i].aspects[j].area_aspect_id;
            o.document_item_id = document_item_id;
            let resp = await this.crudService.Save(o, true, `/documentitem/${document_item_id}/aspects`, "0").toPromise();
            console.log("res ins:" + resp);
          } else {
            let resp = await this.crudService.DeleteParams(this.areasWithAspects[i].aspects[j].item_area_aspect_id, `/documentitem/${document_item_id}/aspects`).toPromise();
            console.log("res del:"+ resp);
          }
        }
      }
    }

  }

  ngOnInit() {
    this.prepareScreen(this.data.payload);
  }

}
