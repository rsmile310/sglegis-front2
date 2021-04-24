import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/services/auth/auth.guard';
import { AreasComponent } from './areas/areas.component';
import { AspectsComponent } from './aspects/aspects.component';
import { CustomerGroupsComponent } from './customer-groups/customer-groups.component';
import { CustomersFormsComponent } from './customers/customers-forms/customers-forms.component';
import { CustomersComponent } from './customers/customers.component';
import { DocumentsComponent } from './documents/documents.component';
import { HomeComponent } from './home/home.component';
import { UnitiesComponent } from './unities/unities.component';

const routes: Routes = [  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [{
      path: 'home',
      component: HomeComponent,
      data: { title: 'Bem vindo', breadcrumb: 'Bem vindo' }
    }]
  },
  {
    path: '',
    children: [{
      path: 'grupos',
      component: CustomerGroupsComponent,
      data: { title: 'Grupos de Clientes', breadcrumb: 'Grupos de Clientes' }
    }]
  },
  {
    path: '',
    children: [{
      path: 'clientes',
      component: CustomersComponent,
      data: { title: 'Clientes', breadcrumb: 'Clientes' }
    }]
  },
  {
    path: '',
    children: [{
      path: 'unidades',
      component: UnitiesComponent,
      data: { title: 'Unidades', breadcrumb: 'Unidades' }
    }]
  },
  {
    path: '',
    children: [{
      path: 'areas',
      component: AreasComponent,
      data: { title: 'Áreas', breadcrumb: 'Áreas' }
    }]
  },
  {
    path: '',
    children: [{
      path: 'aspectos',
      component: AspectsComponent,
      data: { title: 'Aspectos', breadcrumb: 'Aspectos' }
    }]
  },
  {
    path: '',
    children: [{
      path: 'leis',
      component: DocumentsComponent,
      data: { title: 'Aspectos', breadcrumb: 'Aspectos' }
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
