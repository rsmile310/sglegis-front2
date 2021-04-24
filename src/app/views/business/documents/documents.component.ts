import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { AreasFormComponent } from '../areas/areas-form/areas-form.component';
import { DocumentsFormComponent } from './documents-form/documents-form.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  lastSearch: any;
  rows = [];
  
  columns = [
    {
      Propriedade: 'area_id',
      Titulo: 'Documento',
      Visivel: false,
      Largura: 50
    },
    {
      Propriedade: 'area_name',
      Titulo: 'Número',
      Visivel: true,
      Largura:50
    },
    {
      Propriedade: 'area_name',
      Titulo: 'Data',
      Visivel: true,
      Largura:80
    },
    {
      Propriedade: 'area_name',
      Titulo: 'Ementa',
      Visivel: true,
      Largura:80
    },
    {
      Propriedade: 'area_name',
      Titulo: 'Status',
      Visivel: true,
      Largura:80
    },
    {
      Propriedade: 'area_name',
      Titulo: 'Arquivos',
      Visivel: true,
      Largura:120
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
    this.getDocuments(undefined);
    
  }

  openForm(info: any = {}, newRercord: Boolean) {
    let text;     
    text = (newRercord) ? "Novo Documento" : "Editar Documento: " + info.area_id;    
    
    let dialogRef: MatDialogRef<any> = this.dialog.open(DocumentsFormComponent, {
      width: '900px',
      disableClose: true,
      data: { title: text, payload: info, new: newRercord }
    });

    dialogRef.afterClosed()
    .subscribe(res => {      
      this.getDocuments(this.lastSearch);
      return;
    });
  }
  
  getDocuments(parameter: any) {    
    let p: any = new Object();
    p.orderby = "area_name";
    p.direction = "asc";
    this.lastSearch = p;
    this.crud.GetParams(this.lastSearch, "/document").subscribe(res => {
      this.rows = [];
      this.rows = res.body;
    })
  }

  ngOnInit() {
    this.prepareScreen();
  }
  

}
