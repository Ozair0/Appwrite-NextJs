import { Account, Client, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("http://localhost:3000/api")
  .setProject("63d788a15d65fe44c2a9");

export const account = new Account(client);
export const database = new Databases(client);
