import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { UnitiesFormComponent } from './unities-form/unities-form.component';

@Component({
  selector: 'app-unities',
  templateUrl: './unities.component.html',
  styleUrls: ['./unities.component.css']
})
export class UnitiesComponent implements OnInit {
  lastSearch: any;
  rows = [];
  
  columns = [
    {
      Propriedade: 'customer_unity_id',
      Titulo: 'Id da Unidade',
      Visivel: false,
      Largura: 50
    },
    {
      Propriedade: 'customer_unity_cnpj',
      Titulo: 'CNPJ',
      Visivel: true,
      Largura:50
    },
    {
      Propriedade: 'xxx',
      Titulo: 'Grupo',
      Visivel: true,
      Largura:70
    },    
    {
      Propriedade: 'customer_cnpj',
      Titulo: 'Cliente',
      Visivel: true,
      Largura:100
    },
    {
      Propriedade: 'customer_trade_name',
      Titulo: 'Endereço',
      Visivel: true,
      Largura:70
    },        
    {
      Propriedade: 'customer_business_name',
      Titulo: 'Nome do Contato',
      Visivel: true,
      Largura:70
    },
    {
      Propriedade: 'customer_business_name',
      Titulo: 'Email',
      Visivel: true,
      Largura:100
    },
    {
      Propriedade: 'customer_business_name',
      Titulo: 'Telefone',
      Visivel: true,
      Largura:50
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
    this.getUnities(undefined);
    
  }

  openForm(info: any = {}, newRercord: Boolean) {
    let text;     
    text = (newRercord) ? "Novo Cliente" : "Editar Cliente: " + info.customer_id;    
    
    let dialogRef: MatDialogRef<any> = this.dialog.open(UnitiesFormComponent, {
      width: '720px',
      disableClose: true,
      data: { title: text, payload: info, new: newRercord }
    });

    dialogRef.afterClosed()
    .subscribe(res => {      
      this.getUnities(this.lastSearch);
      return;
    });
  }
  
  getUnities(parameter: any) {
    this.lastSearch = parameter;
    this.crud.GetParams(this.lastSearch, "/customerunity").subscribe(res => {
      this.rows = [];
      this.rows = res.body;
    })
  }

  ngOnInit() {
    this.prepareScreen();
  }
  

}
