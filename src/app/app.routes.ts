import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { FormularioComponent } from './pages/formulario/formulario.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layouts/layout.component';

export const routes: Routes = [
  {
    path: '',
    title: 'CodeShop',
    component: LayoutComponent,
    children: [
      {
        path: '',
        title: 'CodeShop',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'cadastro',
        title: 'Cadastro',
        loadComponent: () =>
          import('./pages/formulario/formulario.component').then(
            (b) => b.FormularioComponent
          ),
      },
    ],
  },
];
