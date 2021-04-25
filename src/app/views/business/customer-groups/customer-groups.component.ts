import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';
import { ThemeService } from 'app/services/theme/theme.service';
import { CustomerGroupFormComponent } from './customer-group-form/customer-group-form.component';

@Component({
  selector: 'app-customer-groups',
  templateUrl: './customer-groups.component.html',
  styleUrls: ['./customer-groups.component.css']
})
export class CustomerGroupsComponent implements OnInit {
  lastSearch: any;
  rows = [];
  
  columns = [
    {
      Propriedade: 'customer_group_id',
      Titulo: 'Id do Grupo',
      Visivel: false,
      Largura: 50
    },
    {
      Propriedade: 'customer_group_name',
      Titulo: 'Nome do grupo',
      Visivel: true,
      Largura:200
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
    this.getCustomerGroups(undefined);
    
  }

  openForm(info: any = {}, newRercord: Boolean) {
    let text;     
    text = (newRercord) ? "Novo Grupo" : "Editar Grupo: " + info.customer_group_id;    
    
    let dialogRef: MatDialogRef<any> = this.dialog.open(CustomerGroupFormComponent, {
      width: '720px',
      disableClose: true,
      data: { title: text, payload: info, new: newRercord }
    });

    dialogRef.afterClosed()
    .subscribe(res => {      
      this.getCustomerGroups(this.lastSearch);
      return;
    });
  }
  
  getCustomerGroups(parameter: any) {
    this.lastSearch = parameter;
    this.crud.GetParams(this.lastSearch, "/customergroup").subscribe(res => {
      this.rows = [];
      this.rows = res.body;
    })
  }

  ngOnInit() {
    this.prepareScreen();
  }
  

}
