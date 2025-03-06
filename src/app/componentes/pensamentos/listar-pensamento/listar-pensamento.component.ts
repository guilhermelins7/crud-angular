import { Component, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/modelos/pensamento';
import { PensamentoService } from 'src/app/servicos/pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];

  // Injetando serviço na classe como um atributo para uso dos métodos.
  constructor(private pensamentoService: PensamentoService) {}

  // Chamando lógica do CRUD no ngOnInit para ser executada assim que carregado:
  ngOnInit(): void {
    // chamando o READ:
    // Notar que aqui é necessário a chamada do subscribe para receber atualizações do Observable:
    this.pensamentoService.listar().subscribe((listaPensamentosObs) => {
      this.listaPensamentos = listaPensamentosObs;
    });
  }
}
