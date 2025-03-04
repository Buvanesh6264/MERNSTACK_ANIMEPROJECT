const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const uri = "mongodb://localhost:27017";
const dbName = "animeprojectdb";
const collectionNameforanime = "animedata";
const collectionNameforuser = "users";

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/getanimedetials", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameforanime);
    const documents = await collection.find({}).toArray();
    res.status(200).json({ documents });
  } catch (error) {
    res.status(400).json({ error: "Error fetching data" });
  } finally {
    await client.close();
  }
});

app.get("/getssingleanimebyid/:id", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameforanime);
    const anime = await collection.findOne({ id: Number(req.params.id) });

    if (anime) {
      res.status(200).json(anime);
    } else {
      res.status(400).json({ error: "Anime not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error fetching data" });
  } finally {
    await client.close();
  }
});
app.post("/getuserbyemailorphone", async (req, res) => {
    const { emailOrPhone, password } = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionNameforuser);
        const user = await collection.findOne({
          $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
        });

        if (!user || user.password !== password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({ success: true, user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(400).json({ success: false, message: "Server error" });
    }finally {
        await client.close();
    }
});

app.get("/getuserbyname/:name", async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionNameforuser);
        const user = await collection.findOne({ name: req.params.name });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ error: "Error fetching user data" });
    } finally {
        await client.close();
    }
});

app.post("/updateuser", async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const { name, email, phone } = req.body;
        const collection = db.collection(collectionNameforuser);
        const updatedUser = await collection.findOneAndUpdate(
            { name: name },
            { $set: { email, phone } }
        );
        if (updatedUser) {
            res.status(200).json({ success: true, user: updatedUser });
        } else {
            res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ error: "Error updating user data" });
    } finally {
        await client.close();
    }
});
app.post('/adduser', async (req, res) => {
  const client = new MongoClient(uri);
  try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionNameforuser);
      await collection.insertOne(req.body);
      res.status(200).send('user added');
  } catch (error) {
      res.status(400).send(error);
  } finally {
      await client.close();
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));

