import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListarPensamentoComponent } from './componentes/pensamentos/listar-pensamento/listar-pensamento.component';
import { CriarPensamentoComponent } from './componentes/pensamentos/criar-pensamento/criar-pensamento.component';

const routes: Routes = [
  {
    path: 'listar-pensamento',
    component: ListarPensamentoComponent,
  },
  {
    path: 'criar-pensamento',
    component: CriarPensamentoComponent,
  },
  {
    path: '',
    redirectTo: '/listar-pensamento',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
