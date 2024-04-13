const amqp = require("amqplib")

async function createQueue(){
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const orderQueue = "order"
    const processQueue = "process_order"

    await channel.assertQueue(orderQueue, { durable: false })
    await channel.assertQueue(processQueue, { durable: false })
}