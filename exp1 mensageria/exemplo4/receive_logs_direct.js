const amqp = require("amqplib")

async function receiveMessage(){
    const args = process.argv.slice(2)
    if (args.length == 0) {
        console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
        process.exit(1);
    }

    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchange = "direct_logs"

    channel.assertExchange(exchange, "direct", {
        durable: false
    })
    const { queue } = channel.assertQueue("", { exclusive: true })
    console.log(' [*] Waiting for logs. To exit press CTRL+C')
    args.forEach((severity) => {
        channel.bindQueue(queue, exchange, severity)
    })
    channel.consume(queue, (msg) => {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString())
    }, { noAck: true })
}

receiveMessage()