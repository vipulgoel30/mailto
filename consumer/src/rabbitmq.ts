// Third party imports
import amqp from "amqplib";

(async () => {
  const connection = await amqp.connect("");
  const channel = await connection.createChannel();
  await channel.assertQueue("mailing");
  channel.prefetch(1);

  channel.consume(
    "mailing",
    (msg) => {
      if (msg) {
        console.log(msg!.content.toString());
        channel.ack(msg);
      }
    },
    { noAck: false }
  );
})();
