import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Coluna } from '../../../models/base/Coluna';
import { FormGroup, FormControl } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';
import { MatDialogRef, MatDialog } from '@angular/material';
import { PopupImagemComponent } from '../popup-imagem/popup-imagem.component';
import { AppInformationService } from 'app/services/dialogs/app-information/app-information.service';

@Component({
  selector: 'app-gradeView',
  templateUrl: './grade-visualizar.component.html',
  styleUrls: ['./grade-visualizar.component.css']
})
export class GradeVisualizarComponent implements OnInit {
  @Input() Colunas: Array<Coluna>;
  @Input() BtnEditar: Boolean;
  @Input() BtnDeletar: Boolean;
  @Input() Linhas: Array<any> = [];
  @Input() BtnIncluir : Boolean;
  @Input() MostrarBarraBusca: boolean = true;
  @Output() PesquisarRegistro: EventEmitter<any> = new EventEmitter();
  @Output() IncluirRegistro: EventEmitter<any> = new EventEmitter();
  @Output() EditarRegistro: EventEmitter<any> = new EventEmitter();
  @Output() ExcluirRegistro: EventEmitter<any> = new EventEmitter();
  AuxColunas = [];
  buscarForm: FormGroup;

  constructor(private dialog: MatDialog,
    private mensagem: AppInformationService) 
    {   }

  ngOnInit() {    
    
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
    const campo = formulario.CampoDeBusca;
    this.PesquisarRegistro.emit({ parametro: campo });
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
    if ( (imagem === undefined) ||(imagem ==="")) {
      this.mensagem.information("Informações da lavagem", "Não foi feito registro fotográfico.");
    } else {
      let dialogRef: MatDialogRef<any> = this.dialog.open(PopupImagemComponent, {
        width: '95%;',
        disableClose: true,
        data: { title: "Imagem da lavagem", payload: imagem }
      });

      dialogRef.afterClosed()
        .subscribe(() => { });
    }
  }

}
