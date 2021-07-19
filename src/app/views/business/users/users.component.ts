import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { profile } from 'app/models/auth/profile.types';
import { roles } from 'app/models/auth/roles';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { dialog } from 'app/models/size/size';
import { AuthGuard } from 'app/services/auth/auth.guard';
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
      Titulo: 'Id',
      Visivel: false,
      Largura: 20
    },
    {
      Propriedade: 'user_name',
      Titulo: 'Name',
      Visivel: true,
      Largura: 50
    },    
    {
      Propriedade: 'user_email',
      Titulo: 'Email',
      Visivel: true,
    },
    {
      Propriedade: 'user_role',
      Titulo: 'Tipo Acesso',
      Visivel: true,
      Largura: 50
    },  
    {
      Propriedade: 'user_profile_type',
      Titulo: 'Perfil',
      Visivel: true,
      Largura: 50
    },
    {
      Propriedade: 'customer_group',
      Titulo: 'Group',
      Visivel: true,
      Largura: 50,
      Render: (group) => group.customer_group_name
    },
    {
      Propriedade: 'is_disabled',
      Titulo: 'Status',
      Visivel: true,
      Largura: 50,
      Render: (value) => value == 1 ? "Disabled" : "Active"
    },
  ];

  configSearch = [
    new CampoBusca("user_name", "User", 50, "", "string", null, null, null)
  ]

  currentUser: any = {};
  roles = roles;
  profile = profile;


  constructor(
    private crud: CRUDService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,
    private auth: AuthGuard
  ) { }

  prepareScreen() {
    this.currentUser = this.auth.getUser();
    if (this.currentUser.role !== roles.admin) {
      this.getUsersByGroup(this.currentUser.customer_group_id);
    } else {
      this.getUsers(undefined);
    }
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
      if (this.currentUser.role !== roles.admin) {
        this.getUsersByGroup(this.currentUser.customer_group_id);
      } else {
        this.getUsers(undefined);
      }
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

  getUsersByGroup(groupId) {
    let p: any = new Object();
      p.orderby = "user_name";
      p.direction = "asc";
      p.fields = "customer_group_id";
      p.ops = "eq";
      p.values = groupId;
      this.crud.GetParams(p, "/users/query").subscribe(res => {
        this.rows = [];
        this.rows = res.body;
      });
  }

  ngOnInit() {
    this.prepareScreen();
  }

}
