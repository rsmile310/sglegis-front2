import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { roles } from 'app/models/auth/roles';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AuthGuard } from 'app/services/auth/auth.guard';
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
    { Propriedade: 'area_name', Titulo: 'Sis.Gestão', Visivel: true, Largura:200 },
    { Propriedade: 'area_aspect_name', Titulo: 'Aspecto', Visivel: true, Largura:150 },
    { Propriedade: 'area_name', Titulo: 'Area', Visivel: true, Largura:100 },
    { Propriedade: 'document_item_subject', Titulo: 'Assunto', Visivel: true, Largura:100 },
    { Propriedade: 'document_item_subject', Titulo: 'Âmbito', Visivel: true, Largura:100 },
    { Propriedade: 'document_item_subject', Titulo: 'Documento', Visivel: true, Largura:100 },
    { Propriedade: 'document_item_subject', Titulo: 'Item', Visivel: true, Largura:100 },
    { Propriedade: 'document_item_subject', Titulo: 'Data/Status', Visivel: true, Largura:100 },
    // { Propriedade: 'customer_business_name', Titulo: 'Cliente', Visivel: true, Largura: 150 },
    // { Propriedade: 'customer_unity_name', Titulo: 'Unidade', Visivel: true, Largura: 150 },
  ]

  currentUser: any;
  roles = roles;

  constructor(
    private crud: CRUDService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,
    private auth: AuthGuard,
  ) { }

  prepareScreen() {
    this.getDocuments(undefined);
    this.setConfigSearch();
  }

  async setConfigSearch() {

    //let res = await this.crud.GetParams({ "orderby": "customer_group_name", "direction": "asc" }, "/customergroup").toPromise();
    this.crud.GetParams({ "orderby": "customer_group_name", "direction": "asc" }, "/customergroup").subscribe(res => {
      if (res.status == 200) {
        this.groups = [];
        this.groups = res.body;
      }
    });   
    

    let aux = [      
      new CampoBusca("customer_group_id", "Grupo", 50, "", "LIST", this.groups, "customer_group_name", "customer_group_id"),
      new CampoBusca("customer_business_name", "Matriz", 50, "", "string", null, null, null),
      new CampoBusca("customer_unity_name", "Unidade", 50, "", "string", null, null, null),
      new CampoBusca("area_name", "Sist.Gestão", 50, "", "string", null, null, null),
      new CampoBusca("document_scope_description", "Âmbito", 50, "", "string", null, null, null),
      new CampoBusca("document_item_number", "Número", 50, "", "string", null, null, null),
      new CampoBusca("document_item_subject", "Ementa", 50, "", "string", null, null, null),
      new CampoBusca("document_number", "Documento", 50, "", "string", null, null, null),
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
    this.crud.GetParams(undefined, `/requirements/${this.currentUser.role !== roles.admin ? (this.currentUser.customer_id || 0) : 'all'}`).subscribe(res => {
      this.rows = [];
      this.rows = res.body;
    })
  }

  handleActionPlan(registro: any) {

  }

  ngOnInit() {
    this.currentUser = this.auth.getUser();
    this.prepareScreen();
  }

}
