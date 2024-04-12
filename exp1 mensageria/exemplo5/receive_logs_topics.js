const amqp = require("amqplib")

async function receiveMessage(){
    const args = process.argv.slice(2)
    if (args.length == 0) {
        console.log("Usage: receive_logs_topic.js <facility>.<severity>")
        process.exit(1)
    }
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchange = "topic_logs"

    channel.assertExchange(exchange, "topic", {
        durable: false
    })

    const { queue } = await channel.assertQueue("", { exclusive: true })
    console.log(' [*] Waiting for logs. To exit press CTRL+C')

    args.forEach((key) => {
        channel.bindQueue(queue, exchange, key);
    })

    channel.consume(queue, (msg) => {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString())
    }, { noAck: true })
}

receiveMessage()