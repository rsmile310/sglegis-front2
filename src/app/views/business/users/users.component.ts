import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { dialog } from 'app/models/size/size';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { UsersFormComponent } from './users-form/users-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  lastSearch: any;
  rows = [];

  columns = [
    {
      Propriedade: 'user_id',
      Titulo: 'User Id',
      Visivel: false,
      Largura: 50
    },
    {
      Propriedade: 'user_name',
      Titulo: 'User Id',
      Visivel: true,
      Largura: 50
    },
  ];

  configSearch = [
    new CampoBusca("user_name", "User", 50, "", "string", null, null, null)
  ]

  constructor(
    private crud: CRUDService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService
  ) { }

  prepareScreen() {
    this.getUsers(undefined);
  }
  
  openForm(info: any = {}, newRecord: Boolean) {    
    let text;
    text = (newRecord) ? "New User" : "Edit User: " + info.user_id;
    
    let dialogRef: MatDialogRef<any> = this.dialog.open(UsersFormComponent, {
      width: dialog.small,
      disableClose: true,
      data: { title: text, payload: info, new: newRecord }
    });

    dialogRef.afterClosed()
    .subscribe(res => {
      this.getUsers(this.lastSearch);
      return;
    })
  }

  getUsers(parameter: any) {
    this.lastSearch = this.configSearch;
    this.crud.GetParamsSearch(this.lastSearch, "/users")
      .subscribe(res => {
        this.rows = [];
        this.rows = res.body;
      })
  }

  ngOnInit() {
    this.prepareScreen();
  }

}
