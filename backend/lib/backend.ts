import * as cdk from "aws-cdk-lib";
import { StackProps } from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { EventBus } from "aws-cdk-lib/aws-events";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Topic } from "aws-cdk-lib/aws-sns";
import { EmailSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import * as config from "../../config.json";

interface BackendStackProps extends StackProps {
  readonly charactersTable: string;
  readonly scenesTable: string;
  readonly generatedStoriesTable: string;
  readonly generatedStoriesStreamArn: string;
  readonly frontEndURL: string;
}

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BackendStackProps) {
    super(scope, id, props);

    const openAIAPIKEY = Secret.fromSecretNameV2(
      this,
      "open-api-key",
      "open-api-key"
    );

    const storiesEventBus = new EventBus(this, "ai-stories", {
      eventBusName: `${id}-ai-stories`,
    });

    // Stories Bucket
    const audioBucket = new Bucket(this, "StoriesAudioBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Table to store all characters
    const charactersTable = Table.fromTableName(
      this,
      "charactersTable",
      props.charactersTable
    );
    const scenesTable = Table.fromTableName(
      this,
      "scenesTable",
      props.scenesTable
    );
    const generatedStories = Table.fromTableName(
      this,
      "generatedStories",
      props.generatedStoriesTable
    );

    // Create SNS topic for emails
    const emailTopic = new Topic(this, "email-topic", {
      topicName: "AiStory-story-generated",
    });

    // add email subscription to SNS topic
    emailTopic.addSubscription(new EmailSubscription(config.email));
  }
}
