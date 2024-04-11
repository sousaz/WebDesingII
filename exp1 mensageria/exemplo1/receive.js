const amqp = require("amqplib")

async function receiveMessage(){
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        const queue = "hello"

        channel.assertQueue(queue, {
            durable: false
        })

        console.log(" [*] Waiting for messages in %s. To exist press CTRL+C", queue)
        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString())
        }, { noAck: true })
    } catch (error) {
        console.error(error)
    }
}

receiveMessage()