*Ler em outros idiomas: [English](README.md), [Português](README.pt-BR.md)*

# Exemplo Microservice
Serviço Rest com Node.js, TypeScript, Express and Mongoose.

## Endpoints

| Method | URL                                         | Description                                 |
| ------ | ------------------------------------------- | ------------------------------------------- |
| POST   | host:port/v1/example                        | Cria um novo documento de exemplo           |
| PUT    | host:port/v1/example/:id                    | Altera um documento                         |
| PATCH  | host:port/v1/example/:id                    | Altera parte de um documento                |
| GET    | host:port/v1/example/:id                    | Busca documento por id                      |
| GET    | host:port/v1/example                        | Busca todos os documentos                   |

_**Obs:** Pode ser enviado o parametro fields como query string para definir o retorno. **Ex: host:port/v1/example/:id?fields=name&fields=description**_


## Iniciando

As próximas instruções indicam os passos e dependências necessárias para instalar e executar o projeto.

### Pré-requisitos

- **NodeJs**

### Instalando

- **yarn install** or **npm install**

## Rodando

### Ambiente de desenvolvimento

```bash
export NODE_ENV=dev
npm run build
```

## Construído com

- **NodeJs**
- **Typescript**
- **Express**
