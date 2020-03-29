const bcrypt = require("bcrypt");
const User = require("../models/user");
const Publication = require("../models/publication");
const fs = require("fs");

// This first controller handles the connection of the administrator
exports.authenticate = (req, res) => {
  console.log("On est passé dans la boucle d'authentification");
  const { id, mdp } = req.body.data;
  User.findOne({ email: id })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: "Mauvais token !" });
      }
      bcrypt
        .compare(mdp, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({ connected: true });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.newPublication = (req, res, next) => {
  const textFields = req.body;
  const publication = new Publication({
    title: textFields.title,
    anchor: textFields.anchor,
    author: textFields.author,
    audioAuthor: textFields.audioAuthor,
    description: textFields.description,
    instagram: textFields.instagram,
    soundcloud: textFields.soundcloud,
    withAudio: textFields.withAudio,
    text: textFields.text,
    date: textFields.date,
    words: textFields.text.split(" ").length,
    image: req.files.image[0].filename,
    audio: req.files.audio ? req.files.audio[0].filename : "",
    pdf: req.files.pdf[0].filename
  });
  publication
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllPub = (req, res, next) => {
  Publication.find()
    .then(publications => {
      res.status(200).json(publications);
      console.log("On a tout trouvé");
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};

exports.deletePublication = (req, res, next) => {
  console.log("On passe par la suppression", req.params.id);
  Publication.findOne({ _id: req.params.id })
    .then(publication => {
      console.log("On trouve bien la publication en question");
      if (publication.withAudio === "true") {
        if (publication.audio !== "") {
          fs.unlinkSync("./data/" + publication.audio);
        }
      }
      if (publication.image !== "") {
        fs.unlinkSync("./data/" + publication.image);
      }
      if (publication.pdf !== "") {
        fs.unlinkSync("./data/" + publication.pdf);
      }
      Publication.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimé !" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyPublication = (req, res, next) => {
  console.log("On arrive dans la boucle de modification");
  const textFields = req.body;
  // On commence par gérer les éventuelles suppressions de fichiers du serveur
  if (req.files.image) {
    if (textFields.previousImage !== "") {
      fs.unlinkSync("./data/" + textFields.previousImage);
    }
  }
  if (req.files.pdf) {
    if (textFields.previousPdf !== "") {
      fs.unlinkSync("./data/" + textFields.previousPdf);
    }
  }
  if (req.files.audio) {
    if (textFields.previousAudio !== "") {
      fs.unlinkSync("./data/" + textFields.previousAudio);
    }
  }
  var publication = {
    title: textFields.title,
    anchor: textFields.anchor,
    author: textFields.author,
    audioAuthor: textFields.audioAuthor,
    description: textFields.description,
    instagram: textFields.instagram,
    soundcloud: textFields.soundcloud,
    withAudio: textFields.withAudio,
    text: textFields.text,
    date: textFields.date,
    words: textFields.text.split(" ").length,
    image: req.files.image
      ? req.files.image[0].filename
      : textFields.previousImage,
    audio: req.files.audio
      ? req.files.audio[0].filename
      : textFields.previousAudio,
    pdf: req.files.pdf ? req.files.pdf[0].filename : textFields.previousPdf
  };
  Publication.updateOne(
    { _id: req.params.id },
    { ...publication, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch(error => res.status(400).json({ error }));
};
