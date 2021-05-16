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
  states = [];
  cities = [];
  areas = [];
  aspects = [];
  areasWithAspects = [];

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
    this.unityForm = new FormGroup({
      customer_unity_id: new FormControl(record.customer_unity_id),
      customer_unity_x: new FormControl(record.customer_unity_id),
      customer_unity_cnpj: new FormControl(record.customer_unity_cnpj, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      customer_unity_name: new FormControl(record.customer_unity_name, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      customer_unity_address: new FormControl(record.customer_unity_address, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      customer_unity_city_id: new FormControl(record.customer_unity_city_id, [Validators.required]),
      customer_unity_uf_id: new FormControl(record.customer_unity_uf_id, [Validators.required]),
      customer_unity_cep: new FormControl(record.customer_unity_cep, [Validators.required, Validators.minLength(8)]),
      customer_group_id: new FormControl(record.customer_group_id, [Validators.required]),
      customer_id: new FormControl(record.customer_id, [Validators.required]),
      unity_contact_name: new FormControl(record.unity_contact_name, [Validators.required]),
      unity_contact_email: new FormControl(record.unity_contact_email, [Validators.required, Validators.email]),
      unity_contact_phone: new FormControl(record.unity_contact_phone, [Validators.required]),
      unity_contact_observation: new FormControl()
    });
    this.getGroups();

    this.unityForm.controls.customer_group_id.valueChanges.subscribe(res => {
      this.getCustomers(res);
    });

    if (!this.data.new) {
      this.getCustomers(this.unityForm.controls.customer_group_id.value);
      this.getCep();
    }

    this.getAreasWithAspects(record.customer_unity_id);
  }

  getAreasWithAspects(unity_id) {
    this.crudService.GetParams(undefined, `/customerunity/${unity_id||"0"}/aspects`).subscribe(asps => {
      if (asps.status == 200) {
        this.areasWithAspects = [];
        this.areasWithAspects = asps.body;
      }
    });
  }

  toggleAll(arearWithAspect, evento) {
    for (let i = 0; i < arearWithAspect.aspects.length; i++) {
      arearWithAspect.aspects[i].checked = (evento.checked) ? "S" : "N";
    }
  }

  toggle(aspect, evento) {
    aspect.checked = (evento.checked) ? "S" : "N";
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
      data: { title: "Nova Matriz", payload: "", new: true }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (res == "OK") {
          this.getCustomers(0);
        }
        return;
      });
  }
  deleteUnity() {

  }

  saveUnity() {
    let form = this.unityForm.value;
    this.loader.open();
    this.crudService.Save(form, this.data.new, "/customerunity", form.customer_unity_id).subscribe(res => {
      if (res.status == 200) {
        this.loader.close();
        this.saveAreasAspects(res.body.customer_unity_id || form.customer_unity_id).then(r => {
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

  async saveAreasAspects(unity_id) {
    for (let i = 0; i < this.areasWithAspects.length; i++) {
      for (let j = 0; j < this.areasWithAspects[i].aspects.length; j++) {
        if (this.areasWithAspects[i].aspects[j].checked != this.areasWithAspects[i].aspects[j].previous) {
          if (this.areasWithAspects[i].aspects[j].checked == "S") {
            let o: any = new Object();
            o.area_id = this.areasWithAspects[i].area_id;
            o.area_aspect_id = this.areasWithAspects[i].aspects[j].area_aspect_id;
            o.customer_unity_id = unity_id;
            let resp = await this.crudService.Save(o, true, `/customerunity/${unity_id}/aspects`, "0").toPromise();
            console.log("res ins:" + resp);
          } else {
            let resp = await this.crudService.DeleteParams(this.areasWithAspects[i].aspects[j].unity_area_aspect_id, `/customerunity/${unity_id}/aspects`).toPromise();
            console.log("res del:"+ resp);
          }
        }
      }
    }

  }

  getCep() {
    let cep = this.unityForm.controls.customer_unity_cep.value;
    //this.loader.open();
    this.crudService.GetParams(undefined, "/cep/" + cep).subscribe(res => {
      //this.loader.close();

      if (res.status == 200 && res.body.length > 0) {
        //[{"cep_id":533858,"city_id":9640,"state_id":26,"type":"Rua","street_name":"Rua Bahia (Vl S Pedro)","district_name":"Montanh├úo","cep":9784200,"createdAt":"2021-05-04T01:20:21.000Z","updatedAt":"2021-05-04T01:20:21.000Z"}]
        this.unityForm.controls.customer_unity_address.setValue(res.body[0].street_name);
        this.crudService.GetParams(undefined, "/state").subscribe(s => {
          if (s.status == 200) {
            this.states = [];
            this.states = s.body;
            this.unityForm.controls.customer_unity_uf_id.setValue(res.body[0].state_id);
            let p: any = new Object();
            p.state_id = res.body[0].state_id;
            p.orderby = "city_name";
            p.direction = "asc";
            this.crudService.GetParams(p, "/city").subscribe(c => {
              if (c.status == 200) {
                this.cities = [];
                this.cities = c.body;
                this.unityForm.controls.customer_unity_city_id.setValue(res.body[0].city_id);
              }
            });
          }
        });
      }
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

  getCustomers(group_id) {
    if (group_id != 0) {
      let p: any = new Object();
      p.orderby = "customer_business_name";
      p.direction = "asc";
      p.fields = "customer_group_id";
      p.ops = "eq";
      p.values = group_id;
      this.crudService.GetParams(p, "/customer/query").subscribe(res => {
        this.customers = [];
        this.customers = res.body;
      });
    } else {
      let p: any = new Object();
      p.orderby = "customer_business_name";
      p.direction = "asc";
      p.field = "customer_group_id"
      this.crudService.GetParams(p, "/customer").subscribe(res => {
        this.customers = [];
        this.customers = res.body;
      });
    }
  }

  ngOnInit() {
    this.prepareScreen(this.data.payload);
  }
}
