import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
 
  constructor() { }

  ngOnInit() {
    let data = new Date();
    let ano = data.getFullYear().toString();
    let mes = data.getMonth() + 1;

    let dtIni = ano;
    let dtFim = ano;
    if (mes < 10) {
      dtIni = dtIni + '0' + mes.toString() + "01";
      dtFim = dtFim + '0' + mes.toString() + "31";
    } else {
      dtIni = dtIni + mes.toString() + "01";
      dtFim = dtFim + mes.toString() + "31";
    }
  }
}