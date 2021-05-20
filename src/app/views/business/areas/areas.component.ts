import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { CustomersFormsComponent } from '../customers/customers-forms/customers-forms.component';
import { AreasFormComponent } from './areas-form/areas-form.component';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  lastSearch: any;
  rows = [];
  
  columns = [
    {
      Propriedade: 'area_id',
      Titulo: 'Id do Sistema de Gestão',
      Visivel: false,
      Largura: 50
    },
    {
      Propriedade: 'area_name',
      Titulo: 'Sistema de Gestão',
      Visivel: true,
      Largura:150
    }
  ]

  configSearch = [
    new CampoBusca("filter", "Grupo", 50, "", "string", null, null, null)
  ];

  constructor(
    private crud: CRUDService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,    
  ) { }

  prepareScreen() {
    this.getAreas(undefined);
    
  }

  openForm(info: any = {}, newRercord: Boolean) {
    let text;     
    text = (newRercord) ? "Novo Sistema de Gestão" : "Editar Sistema de Gestão: " + info.area_id;    
    
    let dialogRef: MatDialogRef<any> = this.dialog.open(AreasFormComponent, {
      width: '720px',
      disableClose: true,
      data: { title: text, payload: info, new: newRercord }
    });

    dialogRef.afterClosed()
    .subscribe(res => {      
      this.getAreas(this.lastSearch);
      return;
    });
  }
  
  getAreas(parameter: any) {    
    let p: any = new Object();
    p.orderby = "area_name";
    p.direction = "asc";
    this.lastSearch = p;
    this.crud.GetParams(this.lastSearch, "/area").subscribe(res => {
      this.rows = [];
      this.rows = res.body;
    })
  }

  ngOnInit() {
    this.prepareScreen();
  }
  

}
