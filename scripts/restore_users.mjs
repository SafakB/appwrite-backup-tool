import sdk, { AppwriteException, InputFile } from "node-appwrite";

import Module from "module";
import dotenv from "dotenv";
import { existsSync } from "fs";
import fs from "fs/promises";
import { glob } from "glob";
import path from "path";

const require = Module.createRequire(import.meta.url);

const schema = require(path.join(process.cwd(), "./schema/appwrite.json"));

const HAS_COLLECTION_ATTRIBUTE = (collectionId, attributeKey) => {
  const collection = schema.collections.find(
    (item) => item.$id === collectionId
  );
  if (!collection) {
    return false;
  }
  const attribute = collection.attributes.find(
    (item) => item.key === attributeKey
  );
  return !!attribute;
};

if (!existsSync(".env")) {
  console.log("Missing .env file. Please use .env.example as a template");
  process.exit(-1);
}

dotenv.config();

const DOCUMENT_WRITE_DELAY = 500;
const FILE_UPLOAD_DELAY = 2_000;

const client = new sdk.Client();

client.setEndpoint(process.env.APPWRITE_ENDPOINT);
client.setProject(process.env.APPWRITE_PROJECT_ID);
client.setKey(process.env.APPWRITE_API_KEY);

if (process.env.APPWRITE_SELF_SIGNED) {
  client.setSelfSigned();
}

const users = new sdk.Users(client);


await fs.mkdir("backup/users", { recursive: true });


// Restore users
{
  const userFiles = await glob(`backup/users/*/*.json`, {
    withFileTypes: true,
    stat: true,
  });
  userFiles.sort((a, b) => a.mtime - b.mtime);
  console.log(`Found ${userFiles.length} user profiles`);
  for (const fileRef of userFiles) {
    const file = fileRef.fullpathPosix();
    const text = await fs.readFile(file);
    const data = JSON.parse(text);
    const { $id } = data;
    console.log(`Uploading ${$id} profile`);
    try {
      console.log(`Updating ${$id} profile`);
    } catch {
      // await users.create(sdk.ID.unique(), data);
    }
  }
}
