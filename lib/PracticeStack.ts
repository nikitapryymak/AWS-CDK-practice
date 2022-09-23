import * as cdk from "aws-cdk-lib";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export default class PracticeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "MyQueue", {
      queueName: "NikitaPracticeQueue",
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    const layer = new lambda.LayerVersion(this, "DependenciesLayer", {
      code: lambda.Code.fromAsset("layers"),
      compatibleRuntimes: [lambda.Runtime.NODEJS_16_X],
      description: "NPM packages needed by Lambda",
    });

    const lambdaFn = new lambda.Function(this, "MyLambda", {
      functionName: "ApiGatewayHandler",
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("dist/src"), // gets transpiled ts
      handler: "lambda.handler",
      layers: [layer],
      timeout: cdk.Duration.seconds(5),
      environment: {
        QUEUE_URL: queue.queueUrl,
      },
      description: "Handles API requests from ApiGateway",
    });

    queue.grantSendMessages(lambdaFn);

    const apiGateway = new apigateway.LambdaRestApi(this, "MyApi", {
      handler: lambdaFn,
    });
  }
}
