#!/usr/bin/env node

/**
 * CLI tool to publish messages to Kafka topics
 */

const program = require('commander');
const producer_1 = require('./producer');

program
  .version('0.0.1')
  .usage('[options] <message>')
  .option('-t, --topic [topic]', 'Kafka topic', 'test')
  .parse(process.argv);
const message = program.args.join(' ');
console.log('TOPIC:', program.topic);
console.log('MESSAGE:', message);
producer_1.publish(program.topic, message);
