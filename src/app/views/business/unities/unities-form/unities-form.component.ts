import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { CustomerGroupFormComponent } from '../../customer-groups/customer-group-form/customer-group-form.component';
import { CustomersFormsComponent } from '../../customers/customers-forms/customers-forms.component';

@Component({
  selector: 'app-unities-form',
  templateUrl: './unities-form.component.html',
  styleUrls: ['./unities-form.component.css']
})
export class UnitiesFormComponent implements OnInit {
  public unityForm: FormGroup;
  customers_groups = [];
  customers = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CustomersFormsComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private snackBar: MatSnackBar,
    private confirm: AppConfirmService,
    private dialog: MatDialog,
  ) { }

  prepareScreen(record) {  
    this.unityForm = new FormGroup({
      customer_unity_id: new FormControl(record.customer_unity_id),
      customer_unity_x: new FormControl(record.customer_unity_id),
      customer_unity_cnpj: new FormControl(record.customer_unity_cnpj, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]) ,
      customer_unity_name: new FormControl(record.customer_unity_name, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      customer_unity_address: new FormControl(record.customer_unity_address, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      customer_unity_city_id: new FormControl(record.customer_unity_city_id, [Validators.required]),
      customer_unity_uf_id : new FormControl(record.customer_unity_uf_id, [Validators.required]),
      customer_unity_cep: new FormControl(record.customer_unity_cep, [Validators.required, Validators.minLength(9)]),
      customer_group_id: new FormControl(record.customer_group_id, [Validators.required]),
      responsavel: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      telefones: new FormControl("", [Validators.required]),
      obs : new FormControl()
    });
    this.getGroups();
    

    this.unityForm.controls.customer_group_id.valueChanges.subscribe(res => {
      this.getCustomers();

    })
  }


  newGroupForm() {
    let dialogRef: MatDialogRef<any> = this.dialog.open(CustomerGroupFormComponent, {
      width: '720px',
      disableClose: true,
      data: { title: "Novo Grupo de Cliente", payload: "", new: true }
    });

    dialogRef.afterClosed()
    .subscribe(res => {      
      if (res == "OK") {
        this.getGroups();        
      }
      return;
    });
  }

  newCustomerForm() {
    let dialogRef: MatDialogRef<any> = this.dialog.open(CustomersFormsComponent, {
      width: '720px',
      disableClose: true,
      data: { title: "Novo Cliente", payload: "", new: true }
    });

    dialogRef.afterClosed()
    .subscribe(res => {      
      if (res == "OK") {
        this.getCustomers();    
      }
      return;
    });
  }
  deleteUnity() {
    
  }

  saveUnity() { }

  getCep() {
    let cep = this.unityForm.controls.customer_unity_cep.value;
    this.loader.open();
    this.crudService.GetParams(undefined, "/cep/"+cep).subscribe(res => {
      this.loader.close();
      this.unityForm.controls.customer_unity_address.setValue(res.body.logradouro);
      this.unityForm.controls.customer_unity_city_id.setValue(res.body.localidade);
      this.unityForm.controls.customer_unity_uf_id.setValue(res.body.uf)

    });
  }

  getGroups() {
    let p: any = new Object();
    p.orderby = "customer_group_name";
    p.direction = "asc";
    this.crudService.GetParams(p, "/customergroup").subscribe(res => {
      this.customers_groups = [];
      this.customers_groups = res.body;
    });
  }
  
  getCustomers() {
    let p: any = new Object();
    p.orderby = "customer_name";
    p.direction = "asc";
    this.crudService.GetParams(p, "/customer").subscribe(res => {
      this.customers = [];
      this.customers = res.body;
    });
    
  }

  ngOnInit() {
    this.prepareScreen(this.data.payload);
  }



}
