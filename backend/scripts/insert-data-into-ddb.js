import {
  DynamoDBClient,
  BatchWriteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { map } from "../data/characters.json";
import { map as _map } from "../data/scenes.json";
import { stage } from "../../config.json";

const client = new DynamoDBClient({});

const insertIntoDDB = async () => {
  // insert characters
  await client.send(
    new BatchWriteItemCommand({
      RequestItems: {
        [`${stage}-aiStoriesTables-AiStory-Characters`]: map((character) => ({
          PutRequest: {
            Item: marshall(character),
          },
        })),
      },
    })
  );

  // insert scenes
  await client.send(
    new BatchWriteItemCommand({
      RequestItems: {
        [`${stage}-aiStoriesTables-AiStory-Scenes`]: _map((scene) => ({
          PutRequest: {
            Item: marshall(scene),
          },
        })),
      },
    })
  );
};

insertIntoDDB();
