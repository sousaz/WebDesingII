# Titulo

Multi tenancy

## Descrição

A estratégia escolhida foi **One Database Per Tenant**

A implementação foi feita com express e com sqlite e nas requisições existe um middleware que vai intermediar e pegar o id do *tenant* no cabeçalho da requisição e a partir desse id criar ou estabelecer uma conexão com a database especifica daquele *tenant*.

## Como rodar o projeto

``` bash
npm start
```