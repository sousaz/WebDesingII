const amqp = require('amqplib');

async function sendMessage() {
    // Conectar ao RabbitMQ
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()

    // Definir a fila para os pedidos da loja online
    const queue = 'order'

    // Enviar pedidos para a fila
    setInterval(() => {
        const order = { product: 'Produto XYZ' }
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)))
        console.log('pedido enviado:', order)
    }, 5000) // Envia um pedido a cada 5 segundos
}

sendMessage().catch(console.error)
