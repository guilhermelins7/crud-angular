import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from 'src/app/modelos/pensamento';
import { PensamentoService } from 'src/app/servicos/pensamento.service';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css'],
})
export class ExcluirPensamentoComponent implements OnInit {
  // Declarando o tipo seguindo o contrato para tratarmos internamente
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    // Se faz necessário o uso do ActivatedRoute, para tirar um "snapshot" da rota com ID:
    private rotaAtiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Tirando uma "snapshot" do caminho rota acessada "id":
    /* É necessária essa operação no início do ciclo do componente ...
    ... para termos acesso ao id selecionado. */
    const id = this.rotaAtiva.snapshot.paramMap.get('id');
    this.pensamentoService
      // chamando o método para buscar o pensamento pelo id na rota:
      .buscarPensamentoPorId(parseInt(id!))
      // Atribuindo o pensamento encontrado ao pensamento declarado localmente:
      .subscribe((pensamento) => {
        this.pensamento = pensamento;
      });
  }

  // Chamando o método para excluir o pensamento que encontramos:
  excluirPensamento() {
    if (this.pensamento.id) {
      // Excluindo o pensamento e retornando à página de listagem:
      this.pensamentoService.excluir(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/listar-pensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigateByUrl('/listar-pensamento');
  }
}
