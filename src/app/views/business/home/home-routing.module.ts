import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const HomeRoutingModule: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home funcionando' } }
];


