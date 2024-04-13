const amqp = require('amqplib')
const sqlite = require("sqlite3").verbose()

async function consumers() {
    // Conectar ao RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const db = new sqlite.Database("store.db")

    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product TEXT)`)

    // Definir a fila para os pedidos da loja online
    const queue = 'order';
    const processQueue = 'process_order';
    console.log('Aguardando pedidos...');

    channel.consume(queue, (msg) => {
        const order = JSON.parse(msg.content.toString());
        console.log('Pedido recebido:', order);

        // Salvar o pedido no banco de dados
        db.run(`INSERT INTO orders (product) VALUES (?)`, [order.product])
        console.log("pedido processado")
        channel.sendToQueue(processQueue, Buffer.from(JSON.stringify(order)))
    }, { noAck: true });
}

consumers().catch(console.error);
