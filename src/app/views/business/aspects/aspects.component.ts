import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { profile } from 'app/models/auth/profile.types';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AuthGuard } from 'app/services/auth/auth.guard';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { AreasFormComponent } from '../areas/areas-form/areas-form.component';
import { AspectsFormComponent } from './aspects-form/aspects-form.component';

@Component({
  selector: 'app-aspects',
  templateUrl: './aspects.component.html',
  styleUrls: ['./aspects.component.css']
})
export class AspectsComponent implements OnInit {
  lastSearch: any;
  rows = [];
  
  columns = [
    {
      Propriedade: 'area_aspect_id',
      Titulo: 'Id do Aspecto',
      Visivel: false,
      Largura: 50
    },
    {
      Propriedade: 'area_aspect_name',
      Titulo: 'Nome do Aspecto',
      Visivel: true,
      Largura:150
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

  profile = profile;
  currentUser: any = {};


  constructor(
    private crud: CRUDService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,    
    private auth: AuthGuard
  ) { }

  prepareScreen() {
    this.currentUser = this.auth.getUser();
    this.getAspects(undefined);
    
  }

  openForm(info: any = {}, newRercord: Boolean) {
    let text;     
    text = (newRercord) ? "Novo Aspecto" : "Editar Aspecto: " + info.aspect_id;    
    
    let dialogRef: MatDialogRef<any> = this.dialog.open(AspectsFormComponent, {
      width: '720px',
      disableClose: true,
      data: { title: text, payload: info, new: newRercord }
    });

    dialogRef.afterClosed()
    .subscribe(res => {      
      this.getAspects(this.lastSearch);
      return;
    });
  }
  
  getAspects(parameter: any) {    
    let p: any = new Object();
    p.orderby = "area_aspect_name";
    p.direction = "asc";
    this.lastSearch = p;
    this.crud.GetParams(this.lastSearch, "/areaaspect").subscribe(res => {
      this.rows = [];
      this.rows = res.body;
    })
  }

  ngOnInit() {
    this.prepareScreen();
  }
  

}

