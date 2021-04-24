import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';

@Component({
  selector: 'app-customer-group-form',
  templateUrl: './customer-group-form.component.html',
  styleUrls: ['./customer-group-form.component.css']
})
export class CustomerGroupFormComponent implements OnInit {
  public customerGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CustomerGroupFormComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private snackBar: MatSnackBar,
    private confirm: AppConfirmService,
  ) { }

  ngOnInit() {
    this.prepareScreen(this.data.payload);
  }

  prepareScreen(record) {
    this.customerGroup = new FormGroup({
      customer_group_id: new FormControl(record.customer_group_id),
      customer_group_name: new FormControl(record.customer_group_name,
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ),
    });
  }

  saveCustomerGroup() {
    let customerGroup = this.customerGroup.value;
    this.loader.open();
    this.crudService.Save(customerGroup, this.data.new, "/customergroup", customerGroup.customer_group_id).subscribe(res => {
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

  deleteCustomerGroup(){    
    let customerGroup = this.customerGroup.value;    
    this.confirm.confirm("Exclusão - Grupos de Clientes", "Tem certeza que deseja excluir o Grupo de Clientes " + customerGroup.customer_group_id).subscribe(result => {
      if (result === true) {
        this.loader.open("Excluindo - Grupos de Clientes");
        this.crudService.DeleteParams(customerGroup.customer_group_id, "/customergroup").subscribe(res => {          
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
