// Third party imports
import amqp from "amqplib";

(async () => {
  try {
    const connection = await amqp.connect("");
    const channel = await connection.createChannel();
    await channel.assertQueue("mailing", { durable: true });
    channel.prefetch(1);

    channel.sendToQueue("mailing", Buffer.from("Hello from mailing queue"), { persistent: true });
  } catch (err) {
    console.log(err);
  }
})();
