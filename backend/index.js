var Express = require("express");
var cors = require("cors");

const bodyParser = require('body-parser');

var app = Express();
app.use(cors());
app.use(bodyParser.json());

var database;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://vladconstantinungureanu:iItcPBdVNU4JIQcg@airlinedb.8sslpjg.mongodb.net/?retryWrites=true&w=majority&appName=AirlineDB";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    database = client.db("Airline")
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

var PORT = 5050;

// start the Express server
app.listen(PORT, () => {
    run().catch(console.dir);
    console.log(`Server listening on port ${PORT}`);
  });

app.get("/getCompanies", async (req, res) => {
    let collection = await database.collection("Companies");
    let results = await collection.find({}).toArray();
    // console.log(results);
    res.send(results).status(200);
  });

app.get("/getPilot/:companyId", async (req, res) => {
    const companyId = req.params.companyId;

    let collection = await database.collection("Pilots");
    let results = await collection.find({company:new ObjectId(companyId)}).toArray();

    res.send(results).status(200);
  });

// app.get("/getGoals/:playerId", async (req, res) => {
//     const playerId = req.params.playerId;

//     let collection = await database.collection("players");
//     let player = await collection.findOne({ _id: new ObjectId(playerId) });

//     res.send(player.goals).status(200);
//   });

// app.post("/addPlayer", async (req, res) => {
//     try {
//       const { name, number, position, teamId } = req.body;
//       const newDocument =   {
//                 name: name,
//                 number: number,
//                 position: position,
//                 team: new ObjectId(teamId),
//                 goals: []
//       }
//       let collection = await database.collection("players");
//       let result = await collection.insertOne(newDocument);
//       res.send(result).status(204);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error adding player");
//     }
//   });

// app.patch("/editPlayer/:id", async (req, res) => {
//     try {
    
//       const { playerId, newName, newNumber, newPosition} = req.body;

//       const query = { _id: new ObjectId(playerId) };
//       const updates = {
//         $set: {
//             name: newName,
//             number: newNumber,
//             position: newPosition,
//         },
//       };
  
//       let collection = await database.collection("players");
//       let result = await collection.updateOne(query, updates);
//       res.send(result).status(200);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error updating player");
//     }
//   });

// app.delete("/deletePlayer/:playerId", async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.playerId) };
    
//         const collection = database.collection("players");
//         let result = await collection.deleteOne(query);
    
//         res.send(result).status(200);
//       } catch (err) {
//         console.error(err);
//         res.status(500).send("Error deleting player");
//       }
// })