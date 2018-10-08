*Read this in other languages: [English](README.md), [Português](README.pt-BR.md)*

# Example Microservice
Rest Service with Node.js, TypeScript, Express and Mongoose.

## Endpoints

| Method | URL                                         | Description                                 |
| ------ | ------------------------------------------- | ------------------------------------------- |
| POST   | host:port/v1/example                        | Creates a new example document              |
| PUT    | host:port/v1/example/:id                    | Change a document                           |
| PATCH  | host:port/v1/example/:id                    | Change part of a document                   |
| GET    | host:port/v1/example/:id                    | Search a document by id                     |
| GET    | host:port/v1/example                        | Search all documents                        |

_**Obs:** The fields parameter can be sent as query string to set return. **Ex: host:port/v1/example/:id?fields=name&fields=description**_


## Getting Started

The following instruction indicate the steps and dependencies required to install and run the project.

### Prerequisites

- **NodeJs**

### Installing

- **yarn install** or **npm install**

## Running

### Development environment

```bash
export NODE_ENV=dev
npm run build
```

## Built With

- **NodeJs**
- **Typescript**
- **Express**