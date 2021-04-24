import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { InteracaoMedicamentosaReportComponent } from './interacao-medicamentosa-report/interacao-medicamentosa-report.component';

@NgModule({
  imports: [
    CommonModule,
    RelatoriosRoutingModule
  ],
  declarations: [
    InteracaoMedicamentosaReportComponent
  ]
})
export class RelatoriosModule { }
