const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const Joi = require('joi');
const app = express();
const uri = "mongodb://localhost:27017";
const dbName = "animeprojectdb";
const collectionNameforanime = "animedata";
const collectionNameforuser = "users";
const collectionNameformovie = "animemovies";

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const addanime = Joi.object({
  id: Joi.number().integer().required(),
  title: Joi.string().required(),
  image: Joi.string().required(),
  episodes: Joi.number().integer().min(1).required(),
  genre: Joi.array().items(Joi.string()).required(),
  description: Joi.string().required(),
  watchLink: Joi.string().uri().required(),
  trailer: Joi.string().uri().required(),
  character: Joi.array().items(
      Joi.object({
          id: Joi.number().integer().required(),
          name: Joi.string().required(),
          image: Joi.string().required(),
          character: Joi.string().optional(),
      })
  ).required(),
});

const addmovie = Joi.object({
  id: Joi.number().integer().required(),
  title: Joi.string().required(),
  image: Joi.string().required(),
  duration: Joi.number().integer().min(1).required(),
  genre: Joi.array().items(Joi.string()).required(),
  description: Joi.string().required(),
  watchLink: Joi.string().uri().required(),
  trailer: Joi.string().uri().required(),
  character: Joi.array().items(
      Joi.object({
          id: Joi.number().integer().required(),
          name: Joi.string().required(),
          image: Joi.string().required(),
          character: Joi.string().optional(),
      })
  ).required(),
});


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

app.get("/gettrendinganime", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameforanime);
    const documents = await collection.find({}).limit(4).toArray();
    res.status(200).json({ documents });
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
        if (user.status !== "active") {
          return res.status(400).json({ success: false, message: "Access denied. Your account is not active." });
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
      res.status(201).send('user added');
  } catch (error) {
      res.status(400).send(error);
  } finally {
      await client.close();
  }
});

app.post('/addanime', async (req, res) => {
  const client = new MongoClient(uri);
  const { error } = addanime.validate(req.body);
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }
  try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionNameforanime);
      const existingAnime = await collection.findOne({ id: req.body.id });
      if (existingAnime) {
          return res.status(400).json({ error: "Anime with this ID already exists" });
      }
      await collection.insertOne(req.body);
      res.status(201).json({ message: 'Anime added successfully' });
  } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      await client.close();
  }
});

app.post('/addwatchlist', async (req, res) => {
  const client = new MongoClient(uri);
  
  try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionNameforuser);
      const user = await collection.findOne({ name: req.body.username });
      if (!user) {
          return res.status(400).json({ error: "User not found" });
      }
      if (!req.body.animeId) {
          return res.status(400).json({ error: "Anime ID is required" });
      }
      const animeObject = { id: req.body.animeId };
      const updatedUser = await collection.findOneAndUpdate(
          { name: req.body.username },
          { $addToSet: { watchlist: animeObject } },
          { returnDocument: "after" }
      );

      if (updatedUser) {
          res.status(200).json({ message: "Anime added to watchlist", watchlist: updatedUser.watchlist });
      } else {
          res.status(400).json({ error: "Error adding anime to watchlist" });
      }

  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  } finally {
      await client.close();
  }
});

app.get("/getwatchlist/:username", async (req, res) => {
  const client = new MongoClient(uri);
  const username = req.params.username;
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection(collectionNameforuser);
    const animes = db.collection(collectionNameforanime);
    const user = await users.findOne({ name: username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const animeIds = user.watchlist.map((item) => item.id);
    if (animeIds.length === 0) {
      return res.status(200).json({ watchlist: [] });
    }
    const watchlistAnime = await animes.find({ id: { $in: animeIds } }).toArray();
    res.status(200).json({ watchlist: watchlistAnime });
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(400).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.post("/removewatchlist", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameforuser);

    const { username, animeId } = req.body;
    if (!username || !animeId) {
      return res.status(400).json({ error: "Missing username or animeId" });
    }

    const result = await collection.updateOne(
      { name: username },
      { $pull: { watchlist: { id: animeId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ error: "Anime not found in watchlist" });
    }

    res.status(200).json({ message: "Anime removed from watchlist" });
  } catch (error) {
    console.error("Error removing anime from watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});



app.get("/getmoviedetials", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameformovie);
    const documents = await collection.find({}).toArray();
    res.status(200).json({ documents });
  } catch (error) {
    res.status(400).json({ error: "Error fetching data" });
  } finally {
    await client.close();
  }
});

app.get("/getssinglemoviebyid/:id", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameformovie);
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

app.get("/gettrendingmovie", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameformovie);
    const documents = await collection.find({}).limit(4).toArray();
    res.status(200).json({ documents });
  } catch (error) {
    res.status(400).json({ error: "Error fetching data" });
  } finally {
    await client.close();
  }
});

app.post('/addmovie', async (req, res) => {
  const client = new MongoClient(uri);
  const { error } = addmovie.validate(req.body);
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }
  try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionNameformovie);
      const existingMovie = await collection.findOne({ id: req.body.id });
      if (existingMovie) {
          return res.status(400).json({ error: "Anime with this ID already exists" });
      }
      await collection.insertOne(req.body);
      res.status(201).json({ message: 'Anime added successfully' });
  } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      await client.close();
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));

