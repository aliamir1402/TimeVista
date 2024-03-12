const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors(
  {
    origin:["https://time-vista-two.vercel.app/"],
    method:["POST","GET"],
    credentials:true
  }
));

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
app.post("/api/gisLayer", async (req, res) => {
  try {
    const database = client.db("TimeVista"); // Connect to the "TimeVista" database
    const collection = database.collection("cityDataset"); // Access the "cityDataset" collection
    const EntryData = req.body;
    console.log("Running...");
    if (EntryData.time === 1) {
      // Query the collection for documents with CityID "MUL"
      const FetchDisplay = await collection
        .find(
          {
            CityID: "MUL",
          },
          {
            // Projection: Include only specific fields in the returned documents
            CityID: 1,
            date: 1,
            temperature_2m_mean: 1,
            total_precipitation_mean: 1,
            Humidity: 1,
            "Wind Speed": 1,
            "Wind Direction": 1,
            surface_pressure_mean: 1,
            surface_thermal_radiation_downwards_mean: 1,
          }
        )
        .toArray(); // Convert the cursor to an array
      const minMaxDates = await collection
        .aggregate([
          {
            $match: {
              CityID: "MUL",
            },
          },
          {
            $group: {
              _id: null,
              minDate: { $min: { $toDate: "$date" } },
              maxDate: { $max: { $toDate: "$date" } },
            },
          },
          {
            $project: {
              _id: 0,
              minDate: 1,
              maxDate: 1,
            },
          },
        ])
        .toArray();

      console.log(
        parseInt(minMaxDates[0].minDate.getFullYear()),
        parseInt(minMaxDates[0].maxDate.getFullYear())
      );
      const Syear = parseInt(minMaxDates[0].minDate.getFullYear());
      const Fyear = parseInt(minMaxDates[0].maxDate.getFullYear());
      var YearOBJ = [];

      for (let i = 0; i <= Fyear - Syear; i++) {
        YearOBJ.push({
          City: "",
          coordinates: [71.4782, 30.1575],
          Date: 0,
          Temperature: 0,
          RainFall: 0,
          Pressure: 0,
          Humidity: 0,
          WindSpeed: 0,
          WindDirection: 0,
          Smog: 0,
        });
      }

      var count = 0;
      for (let i = 0; i <= Fyear - Syear; i++) {
        for (let j = 0; j < FetchDisplay.length; j++) {
          if (
            parseInt(
              FetchDisplay[j].date.substring(FetchDisplay[j].date.length - 4)
            ) ===
            1980 + i
          ) {
            YearOBJ[i].City = FetchDisplay[j].CityID;
            YearOBJ[i].Date = 1980 + i;
            YearOBJ[i].coordinates = [71.4782, 30.1575];
            YearOBJ[i].Temperature +=
              FetchDisplay[j].temperature_2m_mean - 273.15;
            YearOBJ[i].RainFall += FetchDisplay[j].total_precipitation_mean;
            YearOBJ[i].Pressure += FetchDisplay[j].surface_pressure_mean;
            YearOBJ[i].Humidity += FetchDisplay[j].Humidity;
            YearOBJ[i].WindSpeed += FetchDisplay[j]["Wind Speed"];
            YearOBJ[i].WindDirection += FetchDisplay[j]["Wind Direction"];
            YearOBJ[i].Smog +=
              FetchDisplay[j].surface_thermal_radiation_downwards_mean;
            count += 1;
          }
        }
        YearOBJ[i].Temperature = YearOBJ[i].Temperature ;
        YearOBJ[i].RainFall = YearOBJ[i].RainFall / count;
        YearOBJ[i].Humidity = YearOBJ[i].Humidity / count;
        YearOBJ[i].Pressure = YearOBJ[i].Pressure / count;
        YearOBJ[i].WindSpeed = YearOBJ[i].WindSpeed / count;
        YearOBJ[i].WindDirection = YearOBJ[i].WindDirection / count;
        YearOBJ[i].Smog = YearOBJ[i].Smog / count;
        YearOBJ[i].Temperature = YearOBJ[i].Temperature / count;
        count = 0;
      }
    }
    console.log(YearOBJ[1]);

    res.json(YearOBJ);
  } catch (error) {
    console.error("Error fetching data:", error);
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
app.get("/api/hello", (req, res) => {
  res.send("Welcome to your Express serverrr!");
});

// Close the MongoDB connection when the server stops
process.on("SIGINT", () => {
  client.close().then(() => {
    console.log("Disconnected from MongoDB");
    process.exit(0);
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
