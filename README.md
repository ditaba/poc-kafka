# PoC Kafka NodeJS

## Install Kafka on local

- Install and run kafka - https://kafka.apache.org/quickstart

- Or, Using Docker compose

```
# Start the Kafka & Zookeeper
docker-compose up -d
# Stop the Kafka & Zookeeper
docker-compose down
```

## Prepare

```
# Install dependencies
npm install
# Link the command-line interface
npm link
```

## Start consumer

```
node consumer.js
```

## Excute client `index.html` on Browser

```
./client/index.html
```

## Send messages using the CLI

Make sure you executed `npm link` orthe following may not work.

```
# cli man page
kafka-publish -h
# send message on the test topic
kafka-publish -t test "Foo bar"
```
