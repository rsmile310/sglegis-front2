import { Component, OnInit } from '@angular/core';
import { NavigationService } from "../../../services/navigation/navigation.service";


@Component({
  selector: 'navigation',
  templateUrl: './navigation.template.html'
})
export class NavigationComponent {
  hasIconTypeMenuItem;
  iconTypeMenuTitle: string;
  menuItems: any[];

  constructor(private navService: NavigationService) { }
  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;

    let user : any = new Object();
    user.userType = 1;

    let x = [];

    switch (user.userType) {
      case 1:
        let i: any = new Object();
        i.Sub = [];
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Grupos", "Ordem": 1, "State": "cadastros/grupos", "Type": "link" })
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Matrizes", "Ordem": 1, "State": "cadastros/clientes", "Type": "link" });
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Unidades", "Ordem": 1, "State": "cadastros/unidades", "Type": "link" });
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Sistemas de Gestão", "Ordem": 1, "State": "cadastros/areas", "Type": "link" });
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Aspectos", "Ordem": 1, "State": "cadastros/aspectos", "Type": "link" });        
        i.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Leis e documentos", "Ordem": 1, "State": "cadastros/leis", "Type": "link" });        
        i.Ativo = "S";
        i.Disable = 0;
        i.Icon = "supervisor_account";
        i.Name = "Cadasros";
        i.Ordem = 1;
        i.State = "";
        i.Type = "dropDown";
        i.Tooltip = "Cadastros";
        x.push(i);

        let l: any = new Object();
        l.Sub = [];
        l.Sub.push({ "Ativo": "S", "Disable": 0, "Icon": "account_circle", "Name": "Associar Unidade e Aspectos", "Ordem": 1, "State": "cadastros/pedidos", "Type": "link" })
    
        
        l.Ativo = "S";
        l.Disable = 0;
        l.Icon = "settings";
        l.Name = "Configurações";
        l.Ordem = 1;
        l.State = "";
        l.Type = "dropDown";
        l.Tooltip = "Configurações";
        x.push(l);        
        

        let j: any = new Object();
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

    this.menuItems = x;
    this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
  }

}