# Simulando uma API com JSON-Server:

Para iniciar, crie uma pasta no repositório do projeto e inicialize um arquivo **`package.json`**:

```bash
# ./back-end:
npm init -y
```

Em seguida, instale a dependência do JSON-Server (para Angular 14, usamos uma versão específica):

```bash
npm i json-server@0.17.4
```

Agora, configure a porta do servidor no **`package.json`**:

```json
{
  "scripts": {
  	// indicando aqui a porta: 3000 para o arquivo db.json:
    "start": "json-server --watch db.json --port 3000"
  },
  "dependencies": {
    "json-server": "^0.17.4"
  }
}

```

Para iniciar o servidor, execute:

```bash
npm start
```

---

## Criando um Service e Injeção de Dependências

### Conceito de Dependências no Angular

Dependências são serviços, objetos, funções ou valores necessários para que uma classe execute sua função.

### Criando um Service para consumo da API

No projeto de CRUD com Angular 14, criamos um serviço para interagir com a API JSON-Server:

```tsx
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Classe com decorador @Injetable (injeção de dependências)
@Injectable({
  // Pode ser injetado em toda aplicação (root)
  providedIn: 'root',
})
export class PensamentoService {
  // Utilizando o HttpClient:
  // Atributo private faz com que o atributo seja automaticamente declarado como
  // ... atributo de classe.
  constructor(private http: HttpClient) {}
}
```

### Injetando serviço na classe para uso:

```tsx
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
    // Notar que aqui é necessário a chamada do subscribe para receber atualizações ...
    // ... do Observable:
    this.pensamentoService.listar().subscribe((listaPensamentosObs) => {
      this.listaPensamentos = listaPensamentosObs;
    });
  }
}

```

---

## Utilizando Observable para chamadas HTTP no Service:

Para começarmos a fazer requisições Http utilizando o json-server, precisamos primeiramente fazer uma injeção de dependência do **`HttpClient`** no serviço**,** para isso, criamos um atributo no construtor tipando com o serviço:

```tsx
import { HttpClient } from '@angular/common/http';

  // Utilizando o HttpClient:
  // Atributo private faz com que o atributo seja automaticamente declarado como
  // ... atributo de classe.
  constructor(private http: HttpClient) {}
```

Observação: essa chamada incluindo o **`private`** é a mesma coisa que:

```tsx
http: HttpClient;

constructor() {
	this.http = new HttpClient();
}
```

Com isso, podemos utilizar os Observable nas chamadas do CRUD, passando como o tipo como **`generics`.**

### Definindo a URL base no Service

```tsx
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';
  constructor(private http: HttpClient) {}
}
```

### Desenvolvendo a lógica do CRUD:

**`READ(GET):`**

```tsx
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}
  
  // READ:
	// Utilizamos aqui o método GET:
	listar(): Observable<Pensamento[]> {
		return this.http.get<Pensamento[]>(this.API);
	}
}
```

Uso no componente:

```tsx
ngOnInit(): void {
  // chamando o READ:
  // Notar que aqui é necessário a chamada do subscribe para receber atualizações ...
  // ... do Observable:
  this.pensamentoService.listar().subscribe(lista => {
    this.listaPensamentos = lista;
  });
}
```

---

**`CREATE(POST)`:**

```tsx
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  // CREATE:
  // Utilizamos aqui o método POST:
  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }
}
```

**Uso no Componente:**

```tsx

export class CriarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(
    private router: Router,
	 // Injetando serviço na classe como um atributo para uso dos métodos:
    private pensamentoService: PensamentoService
  ) {}

  // CREATE
  // Notar que aqui também chamamos posteriormente o Router para redirecionamento.
  criarPensamento() {
    this.pensamentoService.criar(this.pensamento).subscribe(() => {
      this.router.navigateByUrl('/listar-pensamento');
    });
  }
}
```

---

- Notar que para os métodos abaixo, utilizamos o id para fazer a tratativa do elemento no qual pretendemos alterar, por isso aqui implementamos o método **`buscarPensamentoPorId()`.**

**`DELETE(DELETE):`**

A lógica para deletar um elemento em uma API Rest, é feita através do id do elemento, por isso, é necessário criar um método que busque esse id.

```tsx
  private readonly API = 'http://localhost:3000/pensamentos';

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
```

com a lógica definida no serviço, criamos um Modal com aviso, onde sua rota será definida com base no id. Ideal para trabalharmos na exclusão de elementos:

```tsx
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
}
```

**Questão importante**!> nas definições da rota para acessar o componente, devemos definir que vai receber esse id, tanto no TS de rotas, quanto quando vamos definir o redirecionamento com o routerLink:

**Definindo a rota no `app.routing.module.ts`:**

```tsx
import { ExcluirPensamentoComponent } from './componentes/pensamentos/excluir-pensamento/excluir-pensamento.component';

const routes: Routes = [
  {
    // Definindo que a roda finalizara no id do pensamento:
    path: 'listar-pensamento/excluir-pensamento/:id',
    component: ExcluirPensamentoComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

```

Definindo o redirecionamento no botão de acesso:

```tsx
 <div class="acoes">
    <button
      class="botao-excluir"      
      // Definindo a rota de redirecionamento com base no id:
      routerLink="/listar-pensamento/excluir-pensamento/{{ pensamento?.id }}"
    >
      <img
        src="../../../../assets/icone-excluir.png"
        alt="Icone de edição do card"
      />
    </button>
```

**`UPDATE(PUT)`:**

```tsx
// pensamento.service:

  // Criando função para buscar o Pensamento pelo ID:
  buscarPensamentoPorId(id: number): Observable<Pensamento> {
    const url: string = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  // UPDATE:
  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url: string = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }
```

a lógica para edição é muito similar a de excluir um elemento:

```tsx
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
        this.pensamento = pensamento;
      });
  }

	/* a Diferença para exclusão é que aqui não precisamos verificar se id é nulo,
		 pois aqui utilizamos todo o objt pensamento. */
  editarPensamento() {
    this.pensamentoService.editar(this.pensamento).subscribe(() => {
      this.router.navigateByUrl('/listar-pensamento');
    });
  }

  cancelar() {
    this.router.navigateByUrl('/listar-pensamento');
  }
}
```

**Questão importante**!> Da mesma forma que no método **`DELETE`**, devemos definir a rota e o redirecionamento conforme o id:

**Definindo a rota no `app.routing.module.ts`:**

```tsx
import { EditarPensamentoComponent } from './componentes/pensamentos/editar-pensamento/editar-pensamento.component';

const routes: Routes = [
  {
    path: 'listar-pensamento/editar-pensamento/:id',
    component: EditarPensamentoComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

```

Definindo o redirecionamento no botão de acesso:

```tsx
    <button
      class="botao-editar"
      // Definindo a rota de redirecionamento com base no id:
      routerLink="/listar-pensamento/editar-pensamento/{{ pensamento?.id }}"
    >
      <img
        src="../../../../assets/icone-editar.png"
        alt="Icone de edição do card"
      />
    </button>
```
