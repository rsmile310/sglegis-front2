import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { DocumentsFormComponent } from '../documents/documents-form/documents-form.component';
import { RequirementsFormComponent } from './requirements-form/requirements-form.component';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent implements OnInit {
  lastSearch: any;
  rows = [
    {
      "id": "1",
      "desc": "lorem ipsum dolor"
    }
  ];
  
  columns = [
    {
      Propriedade: 'id',
      Titulo: 'Id.',
      Visivel: false,
      Largura: 20
    },
    {
      Propriedade: 'desc',
      Titulo: 'Descrição',
      Visivel: true,
      Largura:50
    }
   
  ]

  configSearch = [
    new CampoBusca("filter", "Grupo", 50, "", "string")
  ];

  constructor(
    private crud: CRUDService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,    
  ) { }

  prepareScreen() {
    this.getDocuments(undefined);    
  }

  openForm(info: any = {}, newRercord: Boolean) {
    let text;     
    text = (newRercord) ? "Novo Documento" : "Editar Documento: " + info.document_id;    
    
    let dialogRef: MatDialogRef<any> = this.dialog.open(RequirementsFormComponent, {
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
    this.crud.GetParams(undefined, "/document").subscribe(res => {
      this.rows = [];
      this.rows = res.body;
    })
  }

  ngOnInit() {
    this.prepareScreen();
  } 

}
