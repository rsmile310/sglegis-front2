import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Coluna } from '../../../models/base/Coluna';
import { FormGroup, FormControl } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';
import { MatDialogRef, MatDialog, MatOption } from '@angular/material';
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
  @Input() BtnResponsible: Boolean;
  @Input() BtnAction: Boolean;
  @Input() BtnEditar: Boolean;
  @Input() BtnDeletar: Boolean;
  @Input() Linhas: Array<any> = [];
  @Input() CamposBusca: Array<CampoBusca>;
  @Input() BtnIncluir: Boolean;
  @Input() viewOnly: Boolean = false;
  @Input() check: Boolean = false;
  @Input() CheckedRows: Array<any> = [];
  @Input() MostrarBarraBusca: boolean = true;
  @Input() Expansible: boolean = false;
  @Input() PropertyToExpanse: String;
  @Input() actionButton: boolean = false;
  @Input() ActionButtonStatus: boolean = false;
  @Input() actionButtonCaption: String;
  @Output() actionButtonEvent: EventEmitter<any> = new EventEmitter();
  @Output() PesquisarRegistro: EventEmitter<any> = new EventEmitter();
  @Output() IncluirRegistro: EventEmitter<any> = new EventEmitter();
  @Output() EditarRegistro: EventEmitter<any> = new EventEmitter();
  @Output() ExcluirRegistro: EventEmitter<any> = new EventEmitter();
  @Output() ResponsibleRegistro: EventEmitter<any> = new EventEmitter();
  @Output() ActionRegistro: EventEmitter<any> = new EventEmitter();
  @Output() CheckRegistro: EventEmitter<any> = new EventEmitter();
  AuxColunas = [];
  buscarForm: FormGroup;
  public finderPanel: boolean = false;
  @ViewChild('buscadorForm') public buscadorForm: ElementRef;
  @ViewChild('txtFinder') public txtFinder: ElementRef;
  @ViewChild('myTable') table: any;
  public formReady: boolean = false;
  public showFilter: boolean = false;

  constructor(public dialog: MatDialog,
    private mensagem: AppInformationService,
    private eRef: ElementRef) { }

  ngOnInit() {    
    this.finderPanel = false;
    if (this.BtnIncluir == undefined) {
      this.BtnIncluir = true;
    }

    this.buscarForm = new FormGroup({});

    for (let i = 0; i < this.CamposBusca.length; i++) {
      this.buscarForm.addControl(this.CamposBusca[i].nomeCampo, new FormControl(""));
    }
    this.AuxColunas = Object.assign([], this.Colunas);
    this.formReady = true;
  }

  showFilters() {
    let ret = false;
    Object.keys(this.buscarForm.controls).forEach(field => {
      let control = this.buscarForm.get(field);
      if (control.value) {
        ret = true;
      }
    });
    return ret;
  }

  // ngAfterViewChecked() { window.dispatchEvent(new Event('resize')) }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.buscadorForm.nativeElement.contains(event.target)) {
      if (!this.txtFinder.nativeElement.contains(event.target)) {       
          //this.finderPanel = false;
      }
    }
  }

  actionButtonClick() {
    this.actionButtonEvent.emit();
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

  onResponsible(registro) {
    this.ResponsibleRegistro.emit({ registro: registro });
  }

  onAction(registro) {
    this.ActionRegistro.emit({ registro: registro });
  }

  onCheck(registro: any, event) {    
    this.CheckRegistro.emit({ registro: registro, status: event.checked })
  }

  isCheckedRow(rowIndex: any) {
    return this.CheckedRows.find(r => r.rowIndex === rowIndex);
  }

  Pesquisar() {
    const formulario = this.buscarForm.value;
    this.finderPanel = false;    
    this.showFilter = this.showFilters();
    this.setFinderValue();
    this.PesquisarRegistro.emit({ parametro: formulario });    
  }

  setFinderValue() {    
    for (let i = 0; i < this.CamposBusca.length; i++){
      this.CamposBusca[i].value = this.buscarForm.controls[this.CamposBusca[i].nomeCampo].value;
    }
  }

  Alternar(col) {
    col.Visivel = !col.Visivel;
    this.Colunas = this.AuxColunas.filter(c => {
      return c.Visivel === true;
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
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
    //this.buscarForm.reset();
    // for (var name in this.buscarForm.controls) {
    //   this.buscarForm.controls[name].setValue("");
    // }
    this.finderPanel = !this.finderPanel;
  }

  clear() {
    this.buscarForm.reset();
    for (var name in this.buscarForm.controls) {
      this.buscarForm.controls[name].setValue("");
    }
    
  }

  closeFinder() {
    this.finderPanel = false;
  }


}
