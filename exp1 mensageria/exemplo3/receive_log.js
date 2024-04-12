const amqp = require('amqplib');

async function consumeMessages() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'logs';

    await channel.assertExchange(exchange, 'fanout', { durable: false });

    const { queue } = await channel.assertQueue('', { exclusive: true });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    await channel.bindQueue(queue, exchange, '');

    channel.consume(queue, function(msg) {
      if (msg.content) {
        console.log(" [x] %s", msg.content.toString());
      }
    }, { noAck: true });
  } catch (error) {
    console.error(error);
  }
}

consumeMessages();
