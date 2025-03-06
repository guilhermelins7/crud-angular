import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/modelos/pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento?: Pensamento;

  constructor() {}

  ngOnInit(): void {}
}
