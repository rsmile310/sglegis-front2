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
      "ASPECTO": "GERAL",
      "AMBITO": "ESTADUAL",
      "DOCUMENTO": "LEI-997",
      "STATUS": "EM VIGOR",
      "ITEM": "ART. 3º",
      "DESCRICAO": "PROIBE O LANÇAMENTO OU LIBERAÇÃO DE POLUENTES NAS ÁGUAS, NO AR OU NO SOLO.",
      "ORDEM_PRATICA": "SIM",
      "CONFORMIDADE": "SIM",
      "EVIDENCIA": "GESTÃO DE RESÍDUOS E EFLUENTES IMPLEMENTADA",
      "ACAO_CONTROLE": "1. MANTER GERENCIAMENTO DAS MATRIZES AMBIENTAIS.",
      "RESPONSAVEL": "EHS"
    },
    {
      "ASPECTO": "LICENCIAMENTO AMBIENTAL",
      "AMBITO": "ESTADUAL",
      "DOCUMENTO": "LEI-997",
      "STATUS": "EM VIGOR",
      "ITEM": "ART. 5º",
      "DESCRICAO": "A INSTALAÇÃO, A CONSTRUÇÃO OU A AMPLIAÇÃO, BEM COMO A OPERAÇÃO OU O FUNCIONAMENTO DAS FONTES DE POLUIÇÃO QUE FOREM ENUMERADAS NO REGULAMENTO DESTA LEI, FICAM SUJEITOS À PRÉVIA AUTORIZAÇÃO DO ÓRGÃO ESTADUAL DE CONTROLE DA POLUIÇÃO DO MEIO-AMBIENTE, MEDIANTE EXPEDIÇÃO, QUANDO FOR O CASO, DE LICENÇA AMBIENTAL PRÉVIA (LAP), E DE LICENÇA AMBIENTAL DE INSTALAÇÃO (LAI) E/OU DE LICENÇA AMBIENTAL DE OPERAÇÃO (LAO).",
      "ORDEM_PRATICA": "SIM",
      "CONFORMIDADE": "SIM",
      "EVIDENCIA": "CERTIFICADO DE DISPENSA DE LICENÇA Nº 36002619 DE 06/11/2013\nATIVIDADE: DEPÓSITO DE MERCADORIAS E CENTRO DE DISTRIBUIÇÃO / COMÉRCIO ATACADISTA DE COSMÉTICOS E PRODUTOS DE PERFUMARIA\nÁREA CONSTRUÍDA: 97.899,14 M2\nBACIA DO RIO JUNDIAÍ – PCJ\nEXIGÊNCIA TÉCNICA:\nNÃO É PERMITIDO O EXERCÍCIO DE QUALQUER ATIVIDADE INDUSTRIAL NO LOCAL\nNÃO PODERÁ SER DESENVOLVIDA NO LOCAL ATIVIDADE DE DEPÓSITO E COMÉRCIO DE PRODUTOS QUÍMICOS E/OU INFLAMÁVEIS\nEVIDÊNCIA: EVIDENCIADO QUE NO LOCAL NÃO HÁ QUALQUER TIPO DE ATIVIDADE INDUSTRIAL, BEM COMO, NÃO É DESENVOLVIDA ATIVIDADE DE DEPÓSITO E COMÉRCIO ATACADISTA DE PRODUTOS QUÍMICOS E/OU INFLAMÁVEIS, CONFORME DETERMINADO NO REFERIDO CERTIFICADO DE DISPENSA DE LICENÇA.\nCERTIFICADO DE DISPENSA DE LICENÇA Nº 36000761 DE 03/12/2015 (TENDA)\nATIVIDADE: COMÉRCIO ATACADISTA DE COSMÉTICOS E PRODUTOS DE PERFUMARIA\nSEM EXIGÊNCIA TÉCNICA\nCERTIFICADO DE DISPENSA DE LICENÇA Nº 36002633 DE 25/10/2018\nATIVIDADE: DEPÓSITO DE MERCADORIAS PARA TERCEIROS (DISTRIBUIÇÃO DE TABACO)\nSEM EXIGÊNCIA TÉCNICA",
      "ACAO_CONTROLE": "1. MANTER INFORMAÇÃO ATUALIZADA.\n2. CUMPRIR AS CONDICIONANTES DO CERTIFICADO DE DISPENSA.\n3.INFORMAR À CETESB ALTERAÇÃO DE ATIVIDADE, AMPLIAÇÃO DE ÁREA E EQUIPAMENTO.",
      "RESPONSAVEL": "EHS"
    }
  ];
  
  columns = [
    { Propriedade: 'ASPECTO', Titulo: 'ASPECTO', Visivel: false, Largura: 20 },
    { Propriedade: 'AMBITO', Titulo: 'ÂMBITO', Visivel: true, Largura:50 },
    { Propriedade: 'DOCUMENTO', Titulo: 'DOCUMENTO', Visivel: true, Largura:50 },
    { Propriedade: 'STATUS', Titulo: 'STATUS', Visivel: true, Largura:50 },
    { Propriedade: 'ITEM', Titulo: 'ITEM', Visivel: true, Largura:50 },
    { Propriedade: 'DESCRICAO', Titulo: 'DESCRIÇÃO', Visivel: true, Largura:50 },
    { Propriedade: 'ORDEM_PRATICA', Titulo: 'ORDEM PRÁTICA', Visivel: true, Largura: 50 },
    { Propriedade: 'CONFORMIDADE', Titulo: 'CONFORMIDADE', Visivel: true, Largura: 50 },
    { Propriedade: 'EVIDENCIA', Titulo: 'EVIDÊNCIA', Visivel: true, Largura: 50 },
    { Propriedade: 'ACAO_CONTROLE', Titulo: 'AÇÃO CONTROLE', Visivel: true, Largura: 50 },
    { Propriedade: 'RESPONSAVEL', Titulo: 'RESPONSÁVEL', Visivel: true, Largura:50 },
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
