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
  rows = [];
  groups = [];
  configSearch: any = [];

  columns = [
    { Propriedade: 'area_name', Titulo: 'Sis.Gestão', Visivel: false, Largura: 350 },
    { Propriedade: 'area_aspect_name', Titulo: 'Aspecto', Visivel: false, Largura: 350 },
    { Propriedade: 'area_name', Titulo: 'Area', Visivel: true, Largura: 150 },
    { Propriedade: 'customer_business_name', Titulo: 'Cliente', Visivel: true, Largura: 300 },
    { Propriedade: 'customer_unity_name', Titulo: 'Unidade', Visivel: true, Largura: 300 },
    { Propriedade: 'document_item_subject', Titulo: 'Assunto', Visivel: true, Largura: 300 },
  ]

  constructor(
    private crud: CRUDService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,
  ) { }

  prepareScreen() {
    this.getDocuments(undefined);
    this.setConfigSearch();
  }

  async setConfigSearch() {

    let res = await this.crud.GetParams({ "orderby": "customer_group_name", "direction": "asc" }, "/customergroup").toPromise();
    //this.crud.GetParams({ "orderby": "customer_group_name", "direction": "asc" }, "/customergroup").subscribe(res => {});
    
    if (res.status == 200) {
      this.groups = [];
      this.groups = res.body;
    }

    let aux = [
      new CampoBusca("filter", "Grupo", 50, "", "LIST", this.groups, "customer_group_name", "customer_group_id"),
      new CampoBusca("filter", "Matriz", 50, "", "string", null, null, null),
      new CampoBusca("filter", "Unidade", 50, "", "string", null, null, null),
      new CampoBusca("filter", "Sist.Gestão", 50, "", "string", null, null, null),
      new CampoBusca("filter", "Âmbito", 50, "", "string", null, null, null),
      new CampoBusca("filter", "Número", 50, "", "string", null, null, null),
      new CampoBusca("filter", "Ementa", 50, "", "string", null, null, null),
      new CampoBusca("filter", "Documento", 50, "", "string", null, null, null),
      new CampoBusca("filter", "Ordem Prática", 50, "", "string", null, null, null),
      new CampoBusca("filter", "Aspecto", 50, "", "string", null, null, null),
      new CampoBusca("filter", "Lista", 50, "", "DATA", null, null, null)
    ];

    this.configSearch = aux;
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

  getGroups() {

  }

  getDocuments(parameter: any) {
    this.crud.GetParams(undefined, "/requirements").subscribe(res => {
      this.rows = [];
      this.rows = res.body;
    })
  }

  ngOnInit() {
    this.prepareScreen();
  }

}
