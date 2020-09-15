/**
 * Kafka Consumer
 */

const dotenv = require('dotenv');
const kafka_node_1 = require('kafka-node');

dotenv.config();

const kafkaHost = process.env.KAFKA_HOST || 'localhost:9092';

function kafkaSubscribe(topic, send) {
  const client = new kafka_node_1.KafkaClient({ kafkaHost });
  const topics = [{ topic: topic, partition: 0 }];
  const options = {
    autoCommit: false,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
  };
  const consumer = new kafka_node_1.Consumer(client, topics, options);
  consumer.on('error', function (err) {
    console.log('error', err);
  });
  client.refreshMetadata([topic], (err) => {
    const offset = new kafka_node_1.Offset(client);
    if (err) {
      throw err;
    }
    consumer.on('message', function (message) {
      send(message);
    });
    /*
     * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
     */
    consumer.on('offsetOutOfRange', (topic) => {
      offset.fetch([topic], function (err, offsets) {
        if (err) {
          return console.error(err);
        }
        const min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
        consumer.setOffset(topic.topic, topic.partition, min);
      });
    });
  });
}

exports.kafkaSubscribe = kafkaSubscribe;
