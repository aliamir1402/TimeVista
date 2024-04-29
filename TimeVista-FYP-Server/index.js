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
      [73.2215, 34.1688], //AAW
      [72.3609, 33.766], //ATK
      [70.6455, 32.991], //BEZ
      [69.5246, 29.8995], //BHC
      [71.0854, 31.6082], //BHK
      [71.6911, 29.3544], //BHV
      [64.6945, 29.3058], //CHAH
      [72.863, 32.9328], //CHL
      [71.8097, 34.9161], //CTR
      [70.6455, 30.0489], //DGK
      [70.9019, 31.8626], //DIK
      [73.135, 31.4504], //FSD
      [74.1945, 32.1877], //GWJ
      [73.6895, 32.0712], //HAF
      [68.3578, 25.396], //HYD
      [73.0479, 33.6844], //ISB
      [73.7257, 32.9425], //JHE
      [72.3317, 31.2781], //JHG
      [71.932, 30.2864], //KHAN
      [72.8781, 33.7328], //KHUR
      [72.3489, 32.2955], //KHUS
      [70.9428, 30.9693], //LAY
      [74.3587, 31.5204], //LHR
      [71.6276, 29.5467], //LOD
      [73.4828, 32.5742], //MAD
      [72.3602, 34.7717], //MGO
      [71.537, 32.5839], //MNW
      [72.0404, 34.1986], //MRD
      [71.5249, 30.1575], //MUL
      [71.1805, 30.0736], //MUZ
      [74.88, 32.1014], //NAR
      [73.4534, 30.8138], //OKD
      [64.1478, 26.7303], //PANJ
      [71.5249, 34.0151], //PES
      [73.3827, 30.3495], //PPT
      [74.4672, 31.1137], //QAS
      [66.975, 30.1798], //Quetta
      [70.3301, 29.1044], //RAP
      [73.0169, 33.5651], //RWP
      [70.2989, 28.4212], //RYK
      [73.1114, 30.6682], //SAH
      [72.6861, 32.074], //SAR
      [73.985, 31.7167], //SHP
      [74.5229, 32.4945], //SIA
      [75.551, 35.3247], //SKD
      [72.4258, 35.2227], //SWT
      [70.2408, 24.8777], //THAR
      [67.9106, 24.7475], //THT
      [72.4826, 30.9709], //TTS
      [63.0383, 26.0081], //TUR
      [69.7376, 25.3549], //UMK
      [73.255, 29.9994], //WGB
      [72.3441, 30.0442], //VEH
    ];
    var CityOBJ = [];
    for (let i = 0; i < numberOfCities.length; i++) {
      CityOBJ.push({
        City: "",
        name: "",
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
    console.log("Original OBJ: " + EntryData.Type);
    if (EntryData.Type === "Area Covered (Acres)") EntryData.Type = "Area";
    else if (EntryData.Type === "Crop Yield (Kg)")
      EntryData.Type = "Production";
    else EntryData.Type = "Yield";

    const database = client.db("TimeVista");
    const collection = database.collection("CropsDetails");
    const FetchDisplay = await collection
      .find({
        $and: [{ Crop: EntryData.Crop }, { Type: EntryData.Type }],
      })
      .toArray();
    console.log("Fetched Documents:", FetchDisplay);
    const LengthArray = FetchDisplay.length;
    var LowestMag = 10000000000000000,
      HighestMag = 0;
    var DataFormat = [];

    for (let i = 0; i < LengthArray; i++) {
      if (FetchDisplay[i][EntryData.Year] > HighestMag)
        HighestMag = FetchDisplay[i][EntryData.Year];
      if (FetchDisplay[i][EntryData.Year] < LowestMag)
        LowestMag = FetchDisplay[i][EntryData.Year];

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
    res.json({
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84",
        },
      },
      features: DataFormat,
      Low: LowestMag,
      High: HighestMag,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/smog", async (req, res) => {
  try {
    const EntryData = req.body;
    console.log("Original OBJ: " + EntryData.Type);
    if (EntryData.Type === "Area Covered (Acres)") EntryData.Type = "Area";
    else if (EntryData.Type === "Crop Yield (Kg)")
      EntryData.Type = "Production";
    else EntryData.Type = "Yield";

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
    console.log("Fetched Documents:", FetchDisplay);
    const LengthArray = FetchDisplay.length;
    var LowestMag = 10000000000000000,
      HighestMag = 0;
    var DataFormat = [];

    for (let i = 0; i < LengthArray; i++) {
      if (FetchDisplay[i][EntryData.Year] > HighestMag)
        HighestMag = FetchDisplay[i][EntryData.Year];
      if (FetchDisplay[i][EntryData.Year] < LowestMag)
        LowestMag = FetchDisplay[i][EntryData.Year];

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
    res.json({
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84",
        },
      },
      features: DataFormat,
      Low: LowestMag,
      High: HighestMag,
    });
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
app.get("/api/OK", (req, res) => {
  res.send("Server Started...");
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
