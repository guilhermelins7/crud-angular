import { Component, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/modelos/pensamento';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [
    {
      conteudo: 'Comunicação',
      autoria: 'Compenente pai',
      modelo: 'modelo3',
    },
    {
      conteudo: 'Minha propriedade é decorada com @Input()',
      autoria: 'Compenente pai',
      modelo: 'modelo2',
    },
    {
      conteudo:
        'Minha propriedade é decorada com @Input() Minha propriedade é decorada com @Input()Minha propriedade é decorada com @Input()Minha propriedade é decorada com @Input()Minha',
      autoria: 'Compenente pai',
      modelo: 'modelo1',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
