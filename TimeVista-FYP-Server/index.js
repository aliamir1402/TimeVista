const express = require("express");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 4000; // Use process.env.PORT or default to 5000

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
    res.json(0);
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
    //console.log("Fetched Documents:", FetchDisplay);
    const LengthArray = FetchDisplay.length;
    console.log(LengthArray);
    var temp = [];
    var historyArray = [];
    var DataFormat = [];
    console.log(EntryData.Year);
    for (let i = 0; i < LengthArray; i++) {
      temp = [];
      if (EntryData.Type == "Avg Crop Yield (Kg/Acre)") {
        for (let j = 1990; j < 2021; j++) {
          temp.push({
            x: j,
            y: FetchDisplay[i][j],
          });
        }
      } else {
        for (let j = 1980; j < 2021; j++) {
          temp.push({
            x: j,
            y: FetchDisplay[i][j],
          });
        }
      }

      historyArray.push(temp);
      console.log(historyArray);
      DataFormat.push({
        type: "Feature",
        properties: {
          index: i,
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
      history: historyArray,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/smog", async (req, res) => {
  try {
    const Coordinates = [
      [74.3274, 31.4835],
      [74.6108, 31.4389],
      [74.8397, 31.4896],
      [74.9905, 31.4584],
      [74.2347, 31.5702],
      [74.4691, 31.3642],
      [74.1316, 31.4237],
      [74.7425, 31.3976],
      [74.3131, 31.3687],
      [74.5994, 31.2961],
      [74.8917, 31.3185],
      [74.0772, 31.289],
      [74.7375, 31.2817],
      [74.1886, 31.321],
      [74.9383, 31.3463],
      [74.2849, 31.2498],
      [74.5539, 31.508],
      [74.8446, 31.3997],
      [74.4537, 31.2704],
      [74.6782, 31.4455],
      [74.1289, 31.2283],
      [74.7226, 31.5032],
      [74.3625, 31.2123],
      [74.5603, 31.3804],
      [74.9128, 31.2546],
      [74.3985, 31.1652],
      [74.8382, 31.3238],
      [74.2354, 31.4068],
      [74.6652, 31.2311],
      [74.0221, 31.366],
      [74.7769, 31.2105],
      [74.3039, 31.4323],
      [74.6336, 31.3591],
      [74.9402, 31.3016],
      [74.1719, 31.2778],
      [74.5368, 31.2164],
      [74.8815, 31.2639],
      [74.4082, 31.3792],
      [74.7973, 31.2749],
      [74.2716, 31.5064],
      [74.7074, 31.1743],
      [74.0679, 31.4086],
      [74.7872, 31.3271],
      [74.2204, 31.3632],
      [74.4987, 31.2479],
      [74.9259, 31.3679],
      [74.3482, 31.2865],
      [74.6327, 31.4657],
      [74.1725, 31.4225],
      [74.7373, 31.216],
      [74.3264, 31.5301],
      [74.5759, 31.3147],
      [74.8664, 31.3525],
      [74.2688, 31.2397],
      [74.6103, 31.1922],
      [74.9276, 31.269],
      [74.4291, 31.3189],
      [74.7748, 31.4539],
      [74.1793, 31.251],
      [74.7454, 31.481],
      [74.3481, 31.2183],
      [74.6249, 31.5387],
      [74.8983, 31.3992],
      [74.2965, 31.3459],
      [74.5518, 31.4138],
      [74.9654, 31.4274],
      [74.1863, 31.4534],
      [74.6896, 31.2506],
      [74.4506, 31.182],
      [74.8339, 31.2894],
      [74.2846, 31.4771],
      [74.6238, 31.3743],
      [74.9403, 31.3197],
      [74.1674, 31.3059],
      [74.7541, 31.1968],
      [74.3905, 31.4143],
      [74.8354, 31.2061],
      [74.2864, 31.2634],
      [74.6898, 31.5144],
      [74.4567, 31.3649],
      [74.7553, 31.3005],
      [74.1927, 31.3242],
      [74.9034, 31.3371],
      [74.3102, 31.3341],
      [74.5468, 31.2472],
      [74.9802, 31.388],
      [74.2348, 31.2979],
      [74.6971, 31.4296],
      [74.3706, 31.2727],
      [74.6189, 31.3569],
      [74.9567, 31.2562],
      [74.1938, 31.416],
      [74.7807, 31.1675],
      [74.3572, 31.5194],
      [74.6207, 31.4485],
      [74.9123, 31.4928],
      [74.2479, 31.3547],
      [74.5289, 31.3199],
      [74.8705, 31.4145],
      [74.3196, 31.4457],
      [74.3577, 31.5204],
      [74.5965, 31.5118],
      [74.9949, 31.5497],
      [74.2741, 31.636],
      [74.4463, 31.8096],
      [74.1622, 31.6134],
      [74.1738, 31.8168],
      [74.6893, 31.7222],
      [74.4287, 31.9762],
      [74.0731, 31.7985],
      [74.6932, 32.0562],
      [74.343, 32.1272],
      [74.8209, 32.089],
      [74.5691, 31.9535],
      [74.7029, 31.8545],
      [74.9814, 31.9272],
      [74.2017, 31.9965],
      [74.169, 31.7354],
      [74.9852, 31.7392],
      [74.1935, 31.9076],
      [74.6184, 32.0847],
      [74.3299, 31.7676],
      [74.4548, 31.6769],
      [74.2341, 31.8591],
      [74.6885, 31.6088],
      [74.4186, 31.7034],
      [74.9303, 31.7719],
      [74.6372, 32.1535],
      [74.2766, 31.9145],
      [74.8522, 31.9505],
      [74.7511, 32.0369],
      [74.1046, 31.8662],
      [74.3804, 31.8793],
      [74.5482, 31.7287],
      [74.7188, 31.604],
      [74.2647, 31.7403],
      [74.8916, 31.857],
      [74.7874, 32.0224],
      [74.4019, 32.0631],
      [74.5138, 31.9462],
      [74.6987, 31.6717],
      [74.1483, 31.9947],
      [74.8673, 31.6799],
      [74.5421, 31.8269],
      [74.9786, 31.8138],
      [74.2799, 31.7973],
      [74.6176, 32.1238],
      [74.3492, 31.8683],
      [74.4625, 31.9469],
      [74.2164, 31.7481],
      [74.7437, 31.958],
      [74.3036, 31.6279],
      [74.5768, 31.6761],
      [74.9751, 31.9006],
      [74.439, 31.8057],
      [74.1652, 31.891],
      [74.6794, 32.0391],
      [74.5275, 31.7225],
      [74.7152, 31.7254],
      [74.9327, 31.8311],
      [74.2641, 31.6994],
      [74.8183, 31.9995],
      [74.3896, 31.9408],
      [74.9862, 31.9987],
      [74.1348, 31.7783],
      [74.5861, 31.8894],
      [74.744, 31.6072],
      [74.4178, 31.6387],
      [74.2383, 31.9681],
      [74.6929, 31.7529],
      [74.8919, 32.0523],
      [74.3446, 31.967],
      [74.5787, 31.7847],
      [74.9465, 31.7286],
      [74.2576, 31.8475],
      [74.8312, 31.8756],
      [74.4347, 32.0143],
      [74.7085, 31.6913],
      [74.1286, 31.9766],
      [74.6742, 31.9027],
      [74.9834, 31.8456],
      [74.3054, 31.8709],
      [74.5284, 32.0201],
      [74.7413, 31.8051],
      [74.1656, 31.7534],
      [74.8662, 31.9891],
      [74.3838, 31.7882],
      [74.9719, 31.7302],
      [74.2322, 31.8448],
      [74.6975, 31.844],
      [74.5757, 31.6178],
      [74.7281, 31.9883],
      [74.919, 31.7778],
      [74.4089, 31.8729],
      [74.9937, 31.6711],
      [74.2693, 31.9768],
      [74.6487, 31.8161],
      [74.1659, 31.6709],
      [74.7821, 32.0452],
      [74.5325, 31.8761],
    ];
    const EntryData = req.body;

    const database = client.db("TimeVista");
    const collection = database.collection("AirQuality");
    const AllData = await collection
      .find(
        {},
        {
          projection: {
            month: 1,
            [EntryData.Type]: 1,
          },
        }
      )
      .toArray();
    const filter = EntryData.Month + "-" + EntryData.Year;
    const MonthData = await collection
      .find(
        {
          month: filter,
        },
        {
          projection: {
            month: 1,
            [EntryData.Type]: 1,
          },
        }
      )
      .toArray();
    console.log("Fetched Documents0:", filter);
    console.log("Fetched Documents1:", MonthData);
    //console.log("Fetched Documents2:", AllData);

    let tempData = [];
    for (let i = 0; i < AllData.length; i++) {
      tempData.push({ x: AllData[i].month, y: AllData[i][EntryData.Type] });
    }

    const LengthArray = Coordinates.length;

    var DataFormat = [];

    for (let i = 0; i < LengthArray; i++) {
      DataFormat.push({
        type: "Feature",
        properties: {
          mag: MonthData[0][EntryData.Type],
          type: EntryData.Type,
        },
        geometry: {
          type: "Point",
          coordinates: Coordinates[i],
        },
      });
    }
    console.log("------------------------------------");
    //console.log("DataFormat", DataFormat);
    console.log("------------------------------------");
    console.log("History", tempData[0]);
    res.json({
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84",
        },
      },
      features: DataFormat,
      History: tempData,
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
