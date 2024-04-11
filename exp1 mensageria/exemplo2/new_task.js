const amqp = require("amqplib")

async function sendMessage(){
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        const queue = "task_queue"
        const msg = process.argv.slice(2).join(" ") || "Hello World!"

        channel.assertQueue(queue, {
            durable: true
        })

        setInterval(() => {
            channel.sendToQueue(queue, Buffer.from(msg), { persistent: true })
    
            console.log(" [x] Sent %s", msg)

        }, 5000)

    } catch (error) {
        console.error(error)
    }
}

sendMessage()