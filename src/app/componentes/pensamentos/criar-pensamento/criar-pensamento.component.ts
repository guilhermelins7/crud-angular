import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  pensamento = {
    id: '1',
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(private router: Router) {}

  criarPensamento() {
    alert('novo pensamento criado!');
  }

  cancelar() {
    this.router.navigateByUrl('/listar-pensamento');
  }

  ngOnInit(): void {}
}
