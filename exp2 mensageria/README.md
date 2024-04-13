# Experimento 2 - RabbitMQ

Nesse experimento foi criado duas filas, uma que recebera os pedidos enviados pela loja e uma que recebera os pedidos processado.

A loja envia produto para a fila de pedidos, que sera consumido pelo consumidor. O consumidor ira processar o pedidod salvando-o no banco de dados e ira repassar o produto para a fila de pedidos processados, que sera consumida pelo consumidor 2.

## Como rodar o projeto

``` shell
npm i
```

Para baixar as dependencias necessarias, amqplib e sqlite3

### Usando docker rode o seguinte comando:

``` shell
sudo docker run -d --hostname my-rabbit --name rabbit13 -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
```

Para que rode o servidor do rabbitMQ

## Ordem de execução dos arquivos

``` shell
node createQueues.js
```

Para criar as duas filas, é preciso executar apenas *uma* vez

``` shell
node online_store.js
```

Para simular o envio de compras de produto da loja

``` shell
node consumer.js
```

Para consumir e processar os produtos

``` shell
node consumer2.js
```

Para consumir os pedidos ja processados