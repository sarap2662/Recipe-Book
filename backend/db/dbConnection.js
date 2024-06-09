const { MongoClient } = require("mongodb"); //

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Ping the server to check if the connection is successful
    await client.db.command({ ping: 1 });
    console.log("Connected to the MongoDB cluster");
  } catch (err) {
    console.error(err);
  }
}

connectToMongoDB();

let db = client.db("recipeBook");

module.exports = db;
