const express = require("express");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000; // Use process.env.PORT or default to 5000

/*
app.use(
  cors({
    origin: ["https://time-vista-two.vercel.app/"],
    method: ["POST", "GET"],
    credentials: true,``
  })
);*/

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

    const regexPattern = new RegExp(`-${EntryData.year}$`); // Constructing the regular expression dynamically
    var uniqueCities = await collection.distinct("CityID");
    console.log(uniqueCities);

    var numberOfCities = uniqueCities;
    var coordinatesCities = [
      [],
      [73.2215, 34.1688],
      [73.135, 31.4504],
      [74.1945, 32.1877],
      [73.0479, 33.6844],
      [74.3587, 31.5204],
      [72.3602, 34.7717],
      [72.0404, 34.1986],
      [71.5249, 30.1575],
      [71.5249, 34.0151],
      [73.0169, 33.5651],
      [72.4258, 35.2227],
      [72.3548, 34.8065],
    ];

    var CityOBJ = [];
    for (let i = 0; i < numberOfCities.length; i++) {
      CityOBJ.push({
        City: "",
        coordinates: [],
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
    for (let i = 0; i < numberOfCities.length; i++) {
      console.log(".");
      if (EntryData.time === 1) {
        // Query the collection for documents with CityID numberofCities[i]
        const FetchDisplay = await collection
          .find(
            {
              CityID: numberOfCities[i],
              date: { $regex: regexPattern }, // Match date ending with '-year'
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
                CityID: numberOfCities[i],
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

        /*console.log(
          parseInt(minMaxDates[0].minDate.getFullYear()),
          parseInt(minMaxDates[0].maxDate.getFullYear())
        );
        const Syear = parseInt(minMaxDates[0].minDate.getFullYear());
        const Fyear = parseInt(minMaxDates[0].maxDate.getFullYear());*/

        var YearOBJ = {
          City: "",
          coordinates: [],
          Date: 0,
          Temperature: 0,
          RainFall: 0,
          Pressure: 0,
          Humidity: 0,
          WindSpeed: 0,
          WindDirection: 0,
          Smog: 0,
        };
        //console.log(FetchDisplay);
        var count = 0;
        YearOBJ.City = numberOfCities[i];
        YearOBJ.Date = EntryData.year;
        YearOBJ.coordinates = coordinatesCities[i];
        for (let j = 0; j < FetchDisplay.length; j++) {
          YearOBJ.Temperature += FetchDisplay[j].temperature_2m_mean - 273.15;
          YearOBJ.RainFall += FetchDisplay[j].total_precipitation_mean;
          YearOBJ.Pressure += FetchDisplay[j].surface_pressure_mean;
          YearOBJ.Humidity += FetchDisplay[j].Humidity;
          YearOBJ.WindSpeed += FetchDisplay[j]["Wind Speed"];
          YearOBJ.WindDirection += FetchDisplay[j]["Wind Direction"];
          YearOBJ.Smog +=
            FetchDisplay[j].surface_thermal_radiation_downwards_mean;
          count += 1;
        }
        CityOBJ[i].City = YearOBJ.City;
        CityOBJ[i].Date = YearOBJ.Date;
        CityOBJ[i].coordinates = YearOBJ.coordinates;
        CityOBJ[i].RainFall = YearOBJ.RainFall * 1000;
        CityOBJ[i].Humidity = YearOBJ.Humidity / count;
        CityOBJ[i].Pressure = YearOBJ.Pressure / count;
        CityOBJ[i].WindSpeed = YearOBJ.WindSpeed / count;
        CityOBJ[i].WindDirection = YearOBJ.WindDirection / count;
        CityOBJ[i].Smog = YearOBJ.Smog / count;
        CityOBJ[i].Smog = CityOBJ[i].Smog / 100000;
        CityOBJ[i].Temperature = YearOBJ.Temperature / count;
        count = 0;
      }
    }
    console.log(CityOBJ);

    res.json(CityOBJ);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

app.post("/api/HistoryData", async (req, res) => {
  try {
    const database = client.db("TimeVista"); // Connect to the "TimeVista" database
    const collection = database.collection("cityDataset"); // Access the "cityDataset" collection
    const EntryData = req.body;
    console.log("Running-2...");
    var feature;
    if (EntryData.feature === 1) feature = "temperature_2m_mean";
    else if (EntryData.feature === 2) feature = "total_precipitation_mean";
    else if (EntryData.feature === 3) feature = "Humidity";
    else if (EntryData.feature === 4) feature = "surface_pressure_mean";
    else if (EntryData.feature === 5) feature = "Wind Speed";
    else if (EntryData.feature === 6)
      feature = "surface_thermal_radiation_downwards_mean";

    var projection = { CityID: 1, date: 1, _id: 0 }; // Always include CityID and date
    projection[feature] = 1; // Dynamically include the selected feature

    var FetchData = await collection
      .aggregate([
        {
          $match: { CityID: EntryData.city },
        },
        {
          $addFields: {
            formatted_date: {
              $dateFromString: {
                dateString: "$date",
                format: "%d-%m-%Y",
              },
            },
          },
        },
        {
          $project: {
            CityID: 1,
            date: 1,
            formatted_date: 1,
            [feature]: 1,
            _id: 0,
          },
        },
        {
          $sort: { formatted_date: -1 },
        },
        {
          $limit: EntryData.days,
        },
      ])
      .toArray();
    console.log(FetchData);

    res.json(FetchData);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add data
app.post("/api/ExEvents", async (req, res) => {
  try {
    const EntryData = req.body;

    const database = client.db("TimeVista");
    const collection = database.collection("natural disaster info");
    const FetchDisplay = await collection.find({}).toArray(); // Convert cursor to array
    console.log(FetchDisplay);
    res.json(FetchDisplay);
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
      res.json([0, FetchDisplay[0].name, FetchDisplay[0].username]); // Send inserted data back as response
    } else if (FetchDisplay.length == 0) {
      res.json([1]);
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add data
app.post("/api/signup", async (req, res) => {
  try {
    const EntryData = req.body;
    const database = client.db("TimeVista");
    const collection = database.collection("users");
    const FetchDisplay = await collection.insertOne(EntryData);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/crop", async (req, res) => {
  try {
    const EntryData = req.body;
    const database = client.db("TimeVista");
    const collection = database.collection("CropsDetails");
    const FetchDisplay = await collection
      .find(
        {
          $and: [{ Crop: EntryData.Crop }, { Type: EntryData.Type }],
        },
        {
          projection: {
            Crop: 1,
            Type: 1,
            Coordinates: 1,
            Districts: 1,
            [EntryData.Year]: 1, // Dynamic field name
          },
        }
      )
      .toArray();

    console.log(FetchDisplay);
    res.json(FetchDisplay);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add data
app.post("/api/contact", async (req, res) => {
  try {
    const EntryData = req.body;
    const database = client.db("TimeVista");
    const collection = database.collection("UserFeedback");
    const FetchDisplay = await collection.insertOne(EntryData);
    const email = "aliamirkhawaja6@gmail.com",
      password = "Computer123456789***";
    const recipient = EntryData.email;
    const subject = EntryData.subject;
    const body =
      `Dear ` +
      EntryData.fname +
      `,

    Thank you for reaching out to us. We appreciate you taking the time to send us your message.
    
    Message:
    ` +
      EntryData.message +
      `
    
    We have received your message and will get back to you as soon as possible. If you have any further questions or concerns, feel free to reply to this email.
    
    Thank you again for contacting us.
    
    Best regards,
    Team TimeVista.
    `;
    const message = "Error sending mail.";
    // Create a Nodemailer transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525, // Elastic Email SMTP port
      auth: {
        user: "aliamirkhawaja6@gmail.com",
        pass: "45634F295447BFCDF8E801F402E61F837808",
      },
    });

    // Define email options
    const mailOptions = {
      from: email,
      to: recipient,
      subject: subject,
      text: body,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error occurred:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle the root path with a simple message
app.get("/", (req, res) => {
  //console.log("Server Started...");
  try {
    const EntryData = {
      Crop: "Cotton",
      Type: "Area",
      Year: "2000",
    };
    var DataFormat = [];
    const database = client.db("TimeVista");
    const collection = database.collection("CropsDetails");

    // Define an async function to use await
    const fetchData = async () => {
      try {
        const FetchDisplay = await collection
          .find(
            {
              $and: [{ Crop: EntryData.Crop }, { Type: EntryData.Type }],
            },
            {
              projection: {
                Crop: 1,
                Type: 1,
                Coordinates: 1,
                Districts: 1,
                [EntryData.Year]: 1, // Dynamic field name
              },
            }
          )
          .toArray();
        const LengthArray = FetchDisplay.length;
        for (let i = 0; i < LengthArray; i++) {
          DataFormat.push({
            type: "Feature",
            properties: {
              mag: FetchDisplay[i][EntryData.Year],
              type: FetchDisplay[i].Type,
              crop: FetchDisplay[i].Crop,
              districts: FetchDisplay[i].Districts,
            },
            geometry: {
              type: "Point",
              coordinates: FetchDisplay[i].Coordinates,
            },
          });
        }
        console.log("Fetched Documents:", FetchDisplay);
        res.json({
          type: "FeatureCollection",
          crs: {
            type: "name",
            properties: {
              name: "urn:ogc:def:crs:OGC:1.3:CRS84",
            },
          },
          features: DataFormat,
        });
      } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    };

    // Call the async function
    fetchData();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Close the MongoDB connection when the server stops
process.on("SIGINT", () => {
  client.close().then(() => {
    console.log("Disconnected from MongoDB");
    process.exit(0);
  });
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${process.env.PORT || PORT}`)
);

/*74LX56F7V5142MBJGXFKGRAV

45634F295447BFCDF8E801F402E61F837808*/
