import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pensamento } from '../modelos/pensamento';
// Importando Observable da RxJs:
import { Observable } from 'rxjs';

// Classe com decorador @Injetable (injeção de dependências)
@Injectable({
  // Pode ser injetado em toda aplicação (root)
  providedIn: 'root',
})
export class PensamentoService {
  // Definindo o caminho da API na classe:
  private readonly API = 'http://localhost:3000/pensamentos';

  // Utilizando o HttpClient:
  // Atributo private faz com que o atributo seja automaticamente declarado como
  // ... atributo de classe.
  constructor(private http: HttpClient) {}

  // READ:
  listar(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.API);
  }

  // CREATE:
  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  // DELETE:
  // Aqui a trativa é feita através do ID:
  excluir(id: number): Observable<Pensamento> {
    const url: string = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  // Criando função para buscar o Pensamento pelo ID:
  buscarPensamentoPorId(id: number): Observable<Pensamento> {
    const url: string = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }
}
