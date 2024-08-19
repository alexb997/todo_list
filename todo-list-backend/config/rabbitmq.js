// config/rabbitmq.js
const amqp = require('amqplib/callback_api');

let channel = null;

const connectRabbitMQ = async () => {
  amqp.connect(process.env.RABBITMQ_URL, (err, connection) => {
    if (err) {
      throw err;
    }
    connection.createChannel((err, ch) => {
      if (err) {
        throw err;
      }
      channel = ch;
      console.log('Connected to RabbitMQ');
    });
  });
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };
