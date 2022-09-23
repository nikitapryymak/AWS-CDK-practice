import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import PracticeStack from "../lib/PracticeStack";

describe("Practice Stack", () => {
  const app = new cdk.App();
  const stack = new PracticeStack(app, "PracticeStack");
  const cfnTemplate = Template.fromStack(stack);

  test("specified resources created", () => {
    cfnTemplate.resourceCountIs("AWS::Lambda::Function", 1);
    cfnTemplate.resourceCountIs("AWS::SQS::Queue", 1);
  });

  test("Lambda has specified properties", () => {
    cfnTemplate.hasResourceProperties("AWS::Lambda::Function", {
      Runtime: "nodejs16.x",
      Handler: "lambda.handler",
      Environment: {
        Variables: {
          QUEUE_URL: {
            Ref: "MyQueueE6CA6235",
          },
        },
      },
    });
  });
});
