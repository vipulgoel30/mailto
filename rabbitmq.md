## Rabbitmq - message broker

### Important parts :
    - Producer : send the message to queue
    - Consumer : receive the message from the queue
    - Queues

> There can be multiple producer and consumer attached to one queue
> Default port : 5672

``Note`` : Docker image : rabbitmq
``Note`` : amqplib -> node.js client for rabbitmq

#### Basic Code
    - send.js
        `var amqp = require('amqplib/callback_api');
        amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';
            var msg = 'Hello World!';

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    });
   `

   - receive.js
    `   var amqp = require('amqplib/callback_api');
        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = 'hello';
                channel.assertQueue(queue, {
                    durable: false
                });
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

                channel.consume(queue, function(msg) {
                    console.log(" [x] Received %s", msg.content.toString());
                }, {
                    noAck: true
                });
            });
        });
    `


``Note`` : To access queues using cmd : rabbitmqctl list_queues (in linux based machines)