"use-strict";
// Import des modules
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Import des routes/controllers/models
const trackingRoutes = require("./routes/tracking");
const ageRoutes = require("./routes/age");
const submissionRoutes = require("./routes/submission");
const contentRoutes = require("./routes/content");
const databaseRoutes = require("./routes/database");
const saveRoutes = require("./routes/save");
const User = require("./models/user");

// Instanciation des variables
const port = process.env.PORT || 5000;
// Options mongodb
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: "identifiant",
  pass: "motdepasse",
  authSource: "bdd"
};
const mongodbAddress = `mongodb://mongodb:27017/bdd`;

// Connection à la base de données
mongoose
  .connect(mongodbAddress, options)
  .then(() => {
    // Au lancement, il faut peupler la base de données avec les id et mdp de l'administrateur si nécessaire
    User.find({
      email: "bidon@live.fr"
    })
      .limit(1)
      .then(answer => {
        if (answer.length === 0) {
          const admin = new User({
            email: "bidon@live.fr",
            password:
              "$2b$10$fktVzWo3V0IVKcYfGci0Suav4OJto.AMw9P.4bbIgXVBMsKJhrgfS" // Le mot de passe "motdepasse" encrypté avec bcrypt
          });
          admin
            .save()
            .then(() =>
              console.log("L'admin a bien été ajouté à la base de données")
            )
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
    console.log("Connexion à MongoDB réussie !");
  })
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app
  .use(cors())
  .use(express.json({ limit: "50mb" }))
  .use("/api/tracking", trackingRoutes)
  .use("/api/age", ageRoutes)
  .use(bodyParser.json({ limit: "50mb", extended: true }))
  .use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
  .use("/api/submission", submissionRoutes)
  .use("/api/content", contentRoutes)
  .use("/api/database", databaseRoutes)
  .use("/api/save", saveRoutes)
  .listen(port, () => console.log("On écoute sur le port : " + port));
