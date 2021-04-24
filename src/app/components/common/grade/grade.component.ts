import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Coluna } from '../../../models/base/Coluna';
import { FormGroup, FormControl } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';
import { MatDialogRef, MatDialog } from '@angular/material';
import { PopupImagemComponent } from '../popup-imagem/popup-imagem.component';
import { AppInformationService } from '../../../../app/services/dialogs/app-information/app-information.service';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  @Input() Colunas: Array<Coluna>;
  @Input() BtnEditar: Boolean;
  @Input() BtnDeletar: Boolean;
  @Input() Linhas: Array<any> = [];
  @Input() CamposBusca: Array<CampoBusca>;
  @Input() BtnIncluir: Boolean;
  @Input() viewOnly: Boolean = false;
  @Input() MostrarBarraBusca: boolean = true;
  @Output() PesquisarRegistro: EventEmitter<any> = new EventEmitter();
  @Output() IncluirRegistro: EventEmitter<any> = new EventEmitter();
  @Output() EditarRegistro: EventEmitter<any> = new EventEmitter();
  @Output() ExcluirRegistro: EventEmitter<any> = new EventEmitter();
  AuxColunas = [];
  buscarForm: FormGroup;
  public finderPanel: boolean = false;
  @ViewChild('buscadorForm') public buscadorForm: ElementRef;
  @ViewChild('txtFinder') public txtFinder: ElementRef;


  constructor(public dialog: MatDialog,
    private mensagem: AppInformationService,
    private eRef: ElementRef) { }

  ngOnInit() {
    
    this.finderPanel = false;
    if (this.BtnIncluir == undefined) {
      this.BtnIncluir = true;
    }
    
    this.buscarForm = new FormGroup({});
    for(let i=0; i<this.CamposBusca.length; i++){
      this.buscarForm.addControl(this.CamposBusca[i].nomeCampo, new FormControl(""));
    }
    this.AuxColunas = Object.assign([], this.Colunas);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.buscadorForm.nativeElement.contains(event.target)) {
      if (!this.txtFinder.nativeElement.contains(event.target)) {
        this.finderPanel = false;
      }
    }
  }

  Incluir() {
    this.IncluirRegistro.emit({ registro: null, novo: true });
  }

  Editar(registro: any) {
    this.EditarRegistro.emit({ registro: registro, novo: false });
  }

  Excluir(registro: any) {
    this.ExcluirRegistro.emit({ registro: registro, novo: false });
  }

  Pesquisar() {
    const formulario = this.buscarForm.value;    
    this.finderPanel = false;
    this.PesquisarRegistro.emit({ parametro: formulario });
  }

  Alternar(col) {
    col.Visivel = !col.Visivel;
    this.Colunas = this.AuxColunas.filter(c => {
      return c.Visivel === true;
    });
  }

  Exportar() {
    let heads = [];
    heads = this.Colunas.map(function (x) { return x.Titulo });

    const options = {
      fieldSeparator: ';',
      quoteStrings: '',
      decimalseparator: ',',
      showLabels: true,
      showTitle: true,
      title: 'Relatiorio CSV',
      useBom: true,
      useKeysAsHeaders: false,
      headers: heads
    };

    const exportToCsv = new ExportToCsv(options);

    exportToCsv.generateCsv(this.Linhas, false);
  }

  openPopup(imagem: string) {
    if ((imagem === undefined) || (imagem === "")) {
      this.mensagem.information("Informações", "Não foi feito registro fotográfico.");
    } else {
      let dialogRef: MatDialogRef<any> = this.dialog.open(PopupImagemComponent, {
        width: '95%;',
        disableClose: true,
        data: { title: "Imagem", payload: imagem }
      });

      dialogRef.afterClosed()
        .subscribe(() => { });
    }
  }

  showFinderToggle() {
    this.buscarForm.reset();
    for(var name in this.buscarForm.controls) {
      this.buscarForm.controls[name].setValue("");      
    }
    this.finderPanel = !this.finderPanel;
  }

  closeFinder() {
    this.finderPanel = false;
  }


}
