import { Message } from 'kafka-node';
export declare function kafkaSubscribe(topic: string, send: (message: Message) => void): void;
