import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { CustomerGroupFormComponent } from '../../customer-groups/customer-group-form/customer-group-form.component';
import { CustomersFormsComponent } from '../../customers/customers-forms/customers-forms.component';

@Component({
  selector: 'app-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.css']
})
export class AreasFormComponent implements OnInit {
  public areaForm: FormGroup;
  customers_groups = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AreasFormComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private snackBar: MatSnackBar,
    private confirm: AppConfirmService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.prepareScreen(this.data.payload);
  }

  prepareScreen(record) {  
    this.areaForm = new FormGroup({
      area_id: new FormControl(record.area_id),
      area_name: new FormControl(record.area_name, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]) 
    });
  }

  saveArea() {
    let customer = this.areaForm.value;
    this.loader.open();
    this.crudService.Save(customer, this.data.new, "/area", customer.customer_id).subscribe(res => {
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

  deleteArea(){    
    let area = this.areaForm.value;    
    this.confirm.confirm("Exclusão - Área", "Tem certeza que deseja excluir a Àrea " + area.area_id).subscribe(result => {
      if (result === true) {
        this.loader.open("Excluindo - Área");
        this.crudService.DeleteParams(area.area_id, "/area").subscribe(res => {          
          if (res.status == 200) {
            this.snackBar.open("Área excluída com sucesso!", "", { duration: 3000 });
            this.dialogRef.close('OK');
            this.loader.close();
          }
          else {
            this.snackBar.open("Erro ao excluir Área", "", { duration: 5000 });
          }
          this.loader.close();
        })
      }
    });
  }  
}
