import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { APIGatewayEvent, Context } from "aws-lambda";

const sqs = new SQSClient({ region: "us-east-1" });

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const queueUrl = process.env.QUEUE_URL;
  if (!queueUrl) throw new Error("SQS Queue Url must be defined");

  const message = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify({
      source: "Lambda",
      functionName: context.functionName,
      path: event.path,
    }),
  });

  const { MessageId } = await sqs.send(message);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Success from Lambda!",
      sqsMessageId: MessageId,
    }),
  };
};
