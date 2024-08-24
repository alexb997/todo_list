const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    channel = await connection.createChannel();
    await channel.assertQueue("tasks_queue", {
      durable: true, // Ensures the queue survives server restarts
    });
    console.log("Connected to RabbitMQ");
  } catch (err) {
    console.error("Failed to connect to RabbitMQ", err);
    process.exit(1);
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }
  return channel;
};

module.exports = { connectRabbitMQ, getChannel };
