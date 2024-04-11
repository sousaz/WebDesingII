const amqp = require("amqplib")

async function sendMessage(){
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        const queue = "task_queue"

        channel.assertQueue(queue, {
            durable: true
        })

        channel.consume(queue, (msg) => {
            const secs = msg.content.toString().split(".").length - 1

            console.log(" [x] Received %s", msg.content.toString())
            setTimeout(() => {
                console.log(" [x] Done")
            }, secs * 1000)
        }, { noAck: true })
    } catch (error) {
        console.error(error)
    }
}

sendMessage()