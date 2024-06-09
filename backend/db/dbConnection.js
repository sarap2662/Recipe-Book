import { MongoClient, ServerApiVersion } from "mongodb";

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect to the MongoDB cluster
  await client.connect();

  // Ping the server to check if the connection is successful
  await client.MONGODB_URI.command({ ping: 1 });
  console.log("Connected to the MongoDB cluster");
} catch (err) {
  console.error(err);
}

let db = client.db("recipeBook");

export default db;
