import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { CustomersFormsComponent } from '../../customers/customers-forms/customers-forms.component';

@Component({
  selector: 'app-docuemnts-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.css']
})
export class DocumentsFormComponent implements OnInit {
  public documentForm: FormGroup;

  columns2 = [{ prop: 'name', name: 'Nome do documento' }, { prop: 'dt', name: 'Data de upload' }];
  rows2 = [
    { name: 'Lei 75.pdf', dt: '15/01/2021' },
    { name: 'Lei 90.pdf', dt: '16/02/2021' }
  ];

  columns1 = [
    { prop: 'item', name: 'Nr. ', width: 200 },
    { prop: 'assunto', name: 'Assunto ', width: 200},
    { prop: 'descricao', name: 'Descrição ', width: 200 }
  ];
  rows1 = [
    { item: 'Artigo 1', assunto: 'Eliminar detritos', descricao: 'Eliminar detritos tóxicos' },
    { item: 'Artigo 2', assunto: 'Eliminar detritos sólidos', descricao: 'Eliminar detritos tóxicos do tipo sólido' },
    { item: 'Artigo 3', assunto: 'Eliminar detritos líquidos', descricao: 'Eliminar detritos tóxicos líquidos' }
  ];
  
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
    this.documentForm = new FormGroup({
      customer_id: new FormControl("")
    });
  }
  
  ngOnInit() {
    this.prepareScreen("");
  }

}
