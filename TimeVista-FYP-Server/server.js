const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 5000;

// MongoDB connection URI
const uri =
  "mongodb+srv://aliamir:12345@tasknow.m5256qt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

// Connect to the MongoDB database when the server starts
client.connect().then(() => {
  console.log("Connected to MongoDB");
});

// Route to display data
app.get("/api/display", async (req, res) => {
  try {
    const database = client.db("tasknow");
    const collection = database.collection("tasks");
    const dataDisplay = await collection.find({}).toArray();
    res.json(dataDisplay);
    //console.log(dataDisplay);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add data
app.post("/api/signup", async (req, res) => {
  try {
    const EntryData = req.body;

    const database = client.db("TimeVista");
    const collection = database.collection("users");
    const FetchDisplay = await collection
      .find(
        {
          $or: [
            {
              email: EntryData["email"],
            },
            { username: EntryData["username"] },
          ],
        },
        {
          username: 1,
          email: 1,
          _id: 0, // Exclude _id field from the result
        }
      )
      .toArray(); // Convert cursor to array

    console.log(FetchDisplay);
    if (FetchDisplay.length == 0) {
      console.log(0);

      const dataDisplay = await collection.insertOne(EntryData);
      //console.log("Data inserted:", dataDisplay.ops[0]);
      res.json(0); // Send inserted data back as response
    } else if (
      FetchDisplay[0].email == EntryData["email"] &&
      FetchDisplay[0].username == EntryData["username"]
    ) {
      res.json(3);
    } else if (FetchDisplay[0].email == EntryData["email"]) {
      res.json(1);
    } else if (FetchDisplay[0].username == EntryData["username"]) {
      res.json(2);
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add data
app.post("/api/login", async (req, res) => {
  try {
    const EntryData = req.body;

    const database = client.db("TimeVista");
    const collection = database.collection("users");
    const FetchDisplay = await collection
      .find(
        {
          $and: [
            {
              username: EntryData["username"],
            },
            { password: EntryData["password"] },
          ],
        },
        {
          username: 1,
          password: 1,
          name: 1,
        }
      )
      .toArray(); // Convert cursor to array

    //console.log(FetchDisplay);
    if (FetchDisplay.length == 1) {
      res.json([0, FetchDisplay[0].name]); // Send inserted data back as response
      
    } else if (FetchDisplay.length == 0) {
      res.json([1, FetchDisplay[0].name]);
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle the root path with a simple message
app.get("/", (req, res) => {
  res.send("Welcome to your Express server!");
});

// Close the MongoDB connection when the server stops
process.on("SIGINT", () => {
  client.close().then(() => {
    console.log("Disconnected from MongoDB");
    process.exit(0);
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
