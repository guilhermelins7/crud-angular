import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from 'src/app/modelos/pensamento';
import { PensamentoService } from 'src/app/servicos/pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(
    private router: Router,
    private pensamentoService: PensamentoService
  ) {}

  // CREATE
  criarPensamento() {
    this.pensamentoService.criar(this.pensamento).subscribe(() => {
      this.router.navigateByUrl('/listar-pensamento');
    });
  }

  cancelar() {
    this.router.navigate(['/listar-pensamento']);
  }

  ngOnInit(): void {}
}
