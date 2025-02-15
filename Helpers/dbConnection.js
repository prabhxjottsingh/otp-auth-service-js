import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const conection_string = process.env.MONGO_URL;
const databaseName = process.env.DBNAME;
const client = new MongoClient(conection_string);

export const databaseConnection = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to database");
  } catch (error) {
    console.error(`error in database connection ${error}`);
  }
};

export const clientConnection = (databaseCollection) => {
  try {
    const db = client.db(databaseName);
    const collection = db.collection(databaseCollection);
    return collection;
  } catch (error) {
    console.error("error in database client connection", error);
  }
};
