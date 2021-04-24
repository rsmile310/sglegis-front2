import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InteracaoMedicamentosaReportComponent } from './interacao-medicamentosa-report/interacao-medicamentosa-report.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'interacao',
      component: InteracaoMedicamentosaReportComponent,
      data: { title: 'Relatório de Interações Medicamentosas' }
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
