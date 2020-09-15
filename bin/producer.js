/**
 * Kafka Producer
 */

const dotenv = require('dotenv');
const kafka_node_1 = require('kafka-node');
dotenv.config();

const kafkaHost = process.env.KAFKA_HOST || 'localhost:9092';

function publish(topic, message) {
  // The client connects to a Kafka broker
  const client = new kafka_node_1.KafkaClient({ kafkaHost });
  // The producer handles publishing messages over a topic
  const producer = new kafka_node_1.Producer(client);
  // First wait for the producer to be initialized
  producer.on('ready', () => {
    // Update metadata for the topic we'd like to publish to
    client.refreshMetadata([topic], (err) => {
      if (err) {
        throw err;
      }
      console.log(`Sending message to ${topic}: ${message}`);
      producer.send([{ topic, messages: [message] }], (err, result) => {
        console.log(err || result);
        process.exit();
      });
    });
  });
  producer.on('error', (err) => {
    console.log('error', err);
  });
}

exports.publish = publish;
