import { Component, OnInit } from '@angular/core';
import { profile } from 'app/models/auth/profile.types';
import { roles } from 'app/models/auth/roles';
import { AuthGuard } from 'app/services/auth/auth.guard';
import { NavigationService } from "../../../services/navigation/navigation.service";


@Component({
  selector: 'navigation',
  templateUrl: './navigation.template.html'
})
export class NavigationComponent {
  hasIconTypeMenuItem;
  iconTypeMenuTitle: string;
  menuItems: any[];

  constructor(private navService: NavigationService, private auth: AuthGuard) { }
  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;

    let currentUser = this.auth.getUser()

    let x = [];
    let i: any = new Object();
    let l: any = new Object();
    let j: any = new Object();
    

    switch (currentUser.role) {
      case roles.admin:
        i.Sub = [];
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Grupos", "Ordem": 1, "State": "cadastros/grupos", "Type": "link" })
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Matrizes", "Ordem": 1, "State": "cadastros/clientes", "Type": "link" });
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Unidades", "Ordem": 1, "State": "cadastros/unidades", "Type": "link" });
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Sistemas de Gestão", "Ordem": 1, "State": "cadastros/areas", "Type": "link" });
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Aspectos", "Ordem": 1, "State": "cadastros/aspectos", "Type": "link" });        
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Documentos", "Ordem": 1, "State": "cadastros/documentos", "Type": "link" });        
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Users", "Ordem": 1, "State": "cadastros/users", "Type": "link" });        
        i.Ativo = "S";
        i.Disable = 0;
        i.Icon = "supervisor_account";
        i.Name = "Cadasros";
        i.Ordem = 1;
        i.State = "";
        i.Type = "dropDown";
        i.Tooltip = "Cadastros";
        x.push(i);

        l.Sub = [];
        l.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Requisitos", "Ordem": 1, "State": "cadastros/audit", "Type": "link" })
    
        
        l.Ativo = "S";
        l.Disable = 0;
        l.Icon = "settings";
        l.Name = "Auditoria";
        l.Ordem = 1;
        l.State = "";
        l.Type = "dropDown";
        l.Tooltip = "Auditoria";
        x.push(l);        
        

        j.Sub = [];
        j.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Leis", "Ordem": 1, "State": "cadastros/pedidos", "Type": "link" })
        j.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Leis vs Clientes", "Ordem": 1, "State": "cadastros/programados", "Type": "link" });
        
        j.Ativo = "S";
        j.Disable = 0;
        j.Icon = "assignment";
        j.Name = "Relatórios";
        j.Ordem = 1;
        j.State = "";
        j.Type = "dropDown";
        j.Tooltip = "Relatórios";
        x.push(j);
        break;
      case roles.client:
      default:        
        if (currentUser.user_profile_type === profile.gestor) {          
          i.Sub = [];
          i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Unidades", "Ordem": 1, "State": "cadastros/unidades", "Type": "link" });
          i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Sistemas de Gestão", "Ordem": 1, "State": "cadastros/areas", "Type": "link" });
          i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Aspectos", "Ordem": 1, "State": "cadastros/aspectos", "Type": "link" });        
          i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Documentos", "Ordem": 1, "State": "cadastros/documentos", "Type": "link" });        
          i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Users", "Ordem": 1, "State": "cadastros/users", "Type": "link" });        
          i.Ativo = "S";
          i.Disable = 0;
          i.Icon = "supervisor_account";
          i.Name = "Cadasros";
          i.Ordem = 1;
          i.State = "";
          i.Type = "dropDown";
          i.Tooltip = "Cadastros";
          x.push(i);
        }

        l.Sub = [];
        l.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Requisitos", "Ordem": 1, "State": "cadastros/audit", "Type": "link" })
    
        
        l.Ativo = "S";
        l.Disable = 0;
        l.Icon = "settings";
        l.Name = "Auditoria";
        l.Ordem = 1;
        l.State = "";
        l.Type = "dropDown";
        l.Tooltip = "Auditoria";
        x.push(l);        
        

        if (currentUser.user_profile_type === profile.gestor) {
          j.Sub = [];
          j.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Leis", "Ordem": 1, "State": "cadastros/pedidos", "Type": "link" })
          j.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Leis vs Clientes", "Ordem": 1, "State": "cadastros/programados", "Type": "link" });
          
          j.Ativo = "S";
          j.Disable = 0;
          j.Icon = "assignment";
          j.Name = "Relatórios";
          j.Ordem = 1;
          j.State = "";
          j.Type = "dropDown";
          j.Tooltip = "Relatórios";
          x.push(j);
        }

        break;
      
        
    }

    this.menuItems = x;
    this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
  }

}