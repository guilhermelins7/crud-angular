import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from 'src/app/modelos/pensamento';
import { PensamentoService } from 'src/app/servicos/pensamento.service';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private rotaAtiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Tirar um snapshot da rota com id:
    const id = this.rotaAtiva.snapshot.paramMap.get('id');
    this.pensamentoService
      .buscarPensamentoPorId(parseInt(id!))
      .subscribe((pensamento) => {
        console.log(pensamento);
        this.pensamento = pensamento;
      });
  }

  editarPensamento() {
    this.pensamentoService.editar(this.pensamento).subscribe(() => {
      this.router.navigateByUrl('/listar-pensamento');
    });
  }

  cancelar() {
    this.router.navigateByUrl('/listar-pensamento');
  }
}
