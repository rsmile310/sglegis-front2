import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { CustomersFormsComponent } from './customers-forms/customers-forms.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  lastSearch: any;
  rows = [];
  
  columns = [
    {
      Propriedade: 'customer_id',
      Titulo: 'Id do Cliente',
      Visivel: false,
      Largura: 50
    },
    {
      Propriedade: 'customer_group_name',
      Titulo: 'Grupo',
      Visivel: true,
      Largura:100
    },    
    {
      Propriedade: 'customer_cnpj',
      Titulo: 'CNPJ',
      Visivel: true,
      Largura:100
    },
    {
      Propriedade: 'customer_trade_name',
      Titulo: 'Nome Fantasia',
      Visivel: true,
      Largura:200
    },        
    {
      Propriedade: 'customer_business_name',
      Titulo: 'Razão Social',
      Visivel: true,
      Largura:200
    }
    
  ]

  configSearch = [
    new CampoBusca("filter", "Grupo", 50, "", "string")
  ];

  constructor(
    private crud: CRUDService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,    
  ) { }

  prepareScreen() {
    this.getCustomers(undefined);
    
  }

  openForm(info: any = {}, newRercord: Boolean) {
    let text;     
    text = (newRercord) ? "Novo Cliente" : "Editar Cliente: " + info.customer_id;    
    
    let dialogRef: MatDialogRef<any> = this.dialog.open(CustomersFormsComponent, {
      width: '720px',
      disableClose: true,
      data: { title: text, payload: info, new: newRercord }
    });

    dialogRef.afterClosed()
    .subscribe(res => {      
      this.getCustomers(this.lastSearch);
      return;
    });
  }
  
  getCustomers(parameter: any) {
    this.lastSearch = parameter;
    this.crud.GetParams(this.lastSearch, "/customer").subscribe(res => {
      this.rows = [];
      this.rows = res.body;
    })
  }

  ngOnInit() {
    this.prepareScreen();
  }
  

}
