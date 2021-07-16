import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { roles } from 'app/models/auth/roles';
import { AuthGuard } from 'app/services/auth/auth.guard';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { CustomerGroupFormComponent } from '../../customer-groups/customer-group-form/customer-group-form.component';

@Component({
  selector: 'app-customers-forms',
  templateUrl: './customers-forms.component.html',
  styleUrls: ['./customers-forms.component.css']
})
export class CustomersFormsComponent implements OnInit {
  public customerForm: FormGroup;
  customers_groups = [];
  currentUser: any;
  roles = roles

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomersFormsComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private snackBar: MatSnackBar,
    private confirm: AppConfirmService,
    public dialog: MatDialog,
    private auth: AuthGuard
  ) { }

  ngOnInit() {
    this.currentUser = this.auth.getUser();
    this.prepareScreen(this.data.payload);
  }

  prepareScreen(record) {  
    this.customerForm = new FormGroup({
      customer_id: new FormControl(record.customer_id),
      customer_business_name: new FormControl(record.customer_business_name, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]) ,      
      customer_group_id: new FormControl(record.customer_group_id, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      customer_cnpj: new FormControl(record.customer_cnpj, [Validators.required, Validators.minLength(14)]),
    });
    this.getGroups();
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

  saveCustomer() {
    let customer = this.customerForm.value;
    this.loader.open();
    this.crudService.Save(customer, this.data.new, "/customer", customer.customer_id).subscribe(res => {
      if (res.status == 200) {
        this.loader.close();
        this.snackBar.open("Registro gravado com sucesso", "", { duration: 3000 });
        this.dialogRef.close('');
      } else {
        this.loader.close();
        this.snackBar.open("Erro ao gravar registro:" + res.Message, "", { duration: 5000 });
        this.dialogRef.close('');
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

  deleteCustomer(){    
    let customer = this.customerForm.value;    
    this.confirm.confirm("Exclusão - Grupos de Clientes", "Tem certeza que deseja excluir o Grupo de Clientes " + customer.customer_id).subscribe(result => {
      if (result === true) {
        this.loader.open("Excluindo - Grupos de Clientes");
        this.crudService.DeleteParams(customer.customer_id, "/customergroup").subscribe(res => {          
          if (res.status == 200) {
            this.snackBar.open("Grupos de Clientes excluído com sucesso!", "", { duration: 3000 });
            this.dialogRef.close('OK');
            this.loader.close();
          }
          else {
            this.snackBar.open("Erro ao excluir Grupos de Clientes!", "", { duration: 5000 });
          }
          this.loader.close();
        })
      }
    });
  }  
}
