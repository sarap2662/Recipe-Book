import { MongoClient, ServerApiVersion } from "mongodb";

// Connect to MongoDB
const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect to the MongoDB cluster
  await client.connect();

  // Send ping to confirm successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to server");
} catch (err) {
  console.error(err);
}

let db = client.db("recipes");

export default db;
