import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
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
  public dialog: MatDialog) {
    
    

  }

  ngOnInit() {
  }

}
