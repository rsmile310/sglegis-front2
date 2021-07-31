import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { CustomersFormsComponent } from '../../customers/customers-forms/customers-forms.component';

@Component({
  selector: 'app-requirements-form',
  templateUrl: './requirements-form.component.html',
  styleUrls: ['./requirements-form.component.css']
})
export class RequirementsFormComponent implements OnInit {
  document_items: any[];
  public audit: FormGroup;
  audits: Array<any> = [];
  expandedForm: Boolean = true;

  public conforms = [
    { "id": 1, "desc": "A VERIFICAR" },
    { "id": 2, "desc": "SIM" },
    { "id": 3, "desc": "NÃO" },
    { "id": 3, "desc": "FUTURO" },
    { "id": 3, "desc": "PARCIAL" },
    { "id": 3, "desc": "A VERIFICAR" }
  ]

  public pratics = [
    { "id": 1, "desc": "A VERIFICAR" },
    { "id": 2, "desc": "SIM" },
    { "id": 3, "desc": "NÃO" },
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CustomersFormsComponent>,
  private loader: AppLoaderService,
  private crudService: CRUDService,
  private snackBar: MatSnackBar,
  private confirm: AppConfirmService,
  public dialog: MatDialog) {  }

  ngOnInit() {
    this.prepareScreen(this.data.payload);    
  }

  prepareScreen(record: any) {
    this.audit = new FormGroup({
      audit_id: new FormControl(null),
      audit_practical_order: new FormControl('', [Validators.required]),
      audit_conformity: new FormControl('', [Validators.required]),
      audit_evidnece_compliance: new FormControl('', [Validators.required]),
      audit_control_action: new FormControl('', [Validators.required])
    })
    this.initItems(record);    
    this.getAudits(record);
  }

  initItems(record: any) {
    const documentItemIds = [];
    this.document_items = [];
    record.forEach(r => {      
      if (!documentItemIds.includes(r.document_item_id)) {        
        documentItemIds.push(r.document_item_id);
        this.document_items.push(r);
      }
    });   
  }

  saveAudit() {
    let audit = this.audit.value;
    this.loader.open();
    this.document_items.forEach(d => {
      let newAudit = {
        ...audit, 
        area_aspect_id: d.area_aspect_id,
        document_item_id: d.document_item_id
      };

      this.crudService.Save(newAudit, this.data.new, "/audits", newAudit.audit_id).subscribe(res => {
        this.loader.close();
        this.snackBar.open("Audit saved successfully", "", { duration: 3000 });
        this.dialogRef.close("OK");
      }, err => {
        this.loader.close();
        this.snackBar.open("Error in saving Audit: " + err, "", { duration: 5000 });
        this.dialogRef.close("NOK");
      })            
      
    })
  }

  getAudits(record: any) {
    let params: any = [];    
    params.document_item_ids = record.map(d => d.document_item_id);
    params.area_aspect_ids = record.map(d => d.area_aspect_id);

    this.crudService.GetParams(params, "/audits").subscribe(res => {
      this.audits = [];
      this.audits = res.body;      
      console.log(res.body);
      
    })
  }

  expandForm(status: boolean) {
    this.expandedForm = status;
  }

  getPratic(id) {
    return this.pratics.find(p => p.id === id);
  }

  getConform(id) {
    return this.conforms.find(c => c.id === id);
  }

}
