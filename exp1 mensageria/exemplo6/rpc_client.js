const amqp = require("amqplib")

async function receiveMessage(){
    const args = process.argv.slice(2)
    if (args.length == 0) {
        console.log("Usage: rpc_client.js num")
        process.exit(1)
    }
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const { queue } = await channel.assertQueue("", { exclusive: true })

    const correlationId = generateUuid()
    const num = parseInt(args[0])

    console.log(' [x] Requesting fib(%d)', num)
    channel.consume(queue, (msg) => {
        if(msg.properties.correlationId == correlationId) {
            console.log(' [.] Got %s', msg.content.toString())
            setTimeout(() => {
                connection.close()
                process.exit(0)
            }, 500)
        }
    }, { noAck: true })

    channel.sendToQueue("rpc_queue",
        Buffer.from(num.toString()), {
            correlationId: correlationId,
            replyTo: queue
        })
}

function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString()
}

receiveMessage()