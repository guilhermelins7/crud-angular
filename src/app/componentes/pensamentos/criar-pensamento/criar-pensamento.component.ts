import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  constructor() {}

  criarPensamento() {
    alert('novo pensamento criado!');
  }

  cancelar() {
    alert('criação de pensamento cancelado!');
  }

  ngOnInit(): void {}
}
