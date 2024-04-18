var Express = require("express");
var cors = require("cors");

const bodyParser = require('body-parser');

var app = Express();
app.use(cors());
app.use(bodyParser.json());

var database;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://vladconstantinungureanu:iItcPBdVNU4JIQcg@airlinedb.8sslpjg.mongodb.net/?retryWrites=true&w=majority&appName=AirlineDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    database = client.db("Airline")
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

var PORT = 5050;

app.listen(PORT, () => {
    run().catch(console.dir);
    console.log(`Server listening on port ${PORT}`);
  });

app.get("/getCompanies", async (req, res) => {
    let collection = await database.collection("Companies");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });

app.get("/getPilot/:companyId", async (req, res) => {
    const companyId = req.params.companyId;

    let collection = await database.collection("Pilots");
    let results = await collection.find({company:new ObjectId(companyId)}).toArray();

    res.send(results).status(200);
  });

app.post("/addPilot", async (req, res) => {
    try {
      const { name, email, phone, role, company, flight_hours} = req.body;
      const newDocument =   {
                name: name,
                email: email,
                phone: phone,
                role: role,
                company: new ObjectId(company),
                flight_hours: flight_hours
      }
      let collection = await database.collection("Pilots");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding pilot");
    }
  });

app.patch("/editPilot/:pilotId", async (req, res) => {
    try {
    
      const { pilotId, newName, newEmail, newPhone, newRole, newFlightHours} = req.body;

      const query = { _id: new ObjectId(pilotId) };
      const updates = {
        $set: {
            name: newName,
            email: newEmail,
            phone: newPhone,
            role: newRole,
            flight_hours: newFlightHours
        },
      };
  
      let collection = await database.collection("Pilots");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating pilot");
    }
  });

app.delete("/deletePilot/:pilotId", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.pilotId) };
    
        const collection = database.collection("Pilots");
        let result = await collection.deleteOne(query);
    
        res.send(result).status(200);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting pilot");
      }
})