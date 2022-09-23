#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import PracticeStack from "../lib/PracticeStack";

const app = new cdk.App();
new PracticeStack(app, "CdkPracticeStack", {});
