const amqp = require('amqplib');

async function consumer() {
    // Conectar ao RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Definir a fila para os pedidos processados
    const queue = 'process_order';

    console.log('Aguardando pedidos processados...');

    channel.consume(queue, (mensagem) => {
        const order = JSON.parse(mensagem.content.toString());
        console.log('order processado recebido:', order);

        // Enviar o pedido processado para o sistema de envio/logística (simulado)
        console.log('Pedido enviado para o sistema de envio/logística.');
    }, { noAck: true });
}

consumer().catch(console.error);
