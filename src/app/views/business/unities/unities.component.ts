import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { profile } from 'app/models/auth/profile.types';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { dialog } from 'app/models/size/size';
import { AuthGuard } from 'app/services/auth/auth.guard';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { UnitiesFormComponent } from './unities-form/unities-form.component';
import { UnitiesResponsibleFormComponent } from './unities-responsible-form/unities-responsible-form.component';

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
      Largura: 30
    },
    {
      Propriedade: 'customer_unity_cnpj',
      Titulo: 'CNPJ',
      Visivel: true,
      Largura:50
    },
    {
      Propriedade: 'customer_group_name',
      Titulo: 'Grupo',
      Visivel: true,
      Largura:70
    },    
    {
      Propriedade: 'customer_unity_name',
      Titulo: 'Unidade',
      Visivel: true,
      Largura:100
    },
    {
      Propriedade: 'customer_unity_address',
      Titulo: 'Endereço',
      Visivel: true,
      Largura:70
    },        
    {
      Propriedade: 'unity_contact_name',
      Titulo: 'Nome do Contato',
      Visivel: true,
      Largura:70
    },
    {
      Propriedade: 'unity_contact_email',
      Titulo: 'Email',
      Visivel: true,
      Largura:100
    },
    {
      Propriedade: 'unity_contact_phone',
      Titulo: 'Telefone',
      Visivel: true,
      Largura:50
    }
  ]

  configSearch = [
    new CampoBusca("filter", "Grupo", 50, "", "string", null, null, null)
  ];

  currentUser: any = {};
  profile = profile;

  constructor(
    private crud: CRUDService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,
    private auth: AuthGuard,    
  ) { }

  prepareScreen() {
    this.currentUser = this.auth.getUser();
    this.getUnities(undefined);
    
  }

  openForm(info: any = {}, newRercord: Boolean) {
    let text;     
    text = (newRercord) ? "Nova Unidade" : "Editar Unidade: " + info.customer_id;    
    
    let dialogRef: MatDialogRef<any> = this.dialog.open(UnitiesFormComponent, {
      width: '900px',
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

  openResponsibleForm(info: any = {}) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(UnitiesResponsibleFormComponent, {
      width: dialog.medium,
      disableClose: true,
      data: { title: "Responsible per Unit", payload: info }
    });
  }

  ngOnInit() {
    this.prepareScreen();
  }
  

}
