const Download = require("../models/download");
const Newsletter = require("../models/newsletter");

function handlePayload(payload) {
  const temp = payload.body.newSubscriber;
  const name = temp.pseudo;
  const email = temp.email;
  const message = temp.pourquoi;
  const options = payload.body.options;
  if (options[0] != "") {
    var web = "yes";
  } else {
    var web = "no";
  }
  if (options[1] != "") {
    var app = "yes";
  } else {
    var app = "no";
  }
  return { name: name, email: email, message: message, web: web, app: app };
}

exports.newSubscriber = (req, res) => {
  var object = handlePayload(req);
  Newsletter.find({
    name: object.name
  })
    .limit(1)
    .then(answer => {
      if (answer.length === 0) {
        const newsletter = new Newsletter(object);
        newsletter
          .save()
          .then(() => res.send("Merci pour ta souscription :)"))
          .catch(error => {
            console.log(error);
            res.send(
              "Il semblerait qu'il y ait eu une erreur... Envoie-nous un message sur insta ;)"
            );
          });
      } else {
        res.send("Tu t'es déjà inscrit ;)");
      }
    })
    .catch(err => console.log(err));
};

exports.countDownloads = (req, res, next) => {
  console.log(req);
  Download.find({
    title: req.body.title
  })
    .limit(1)
    .then(download => {
      if (download.length > 0) {
        // Si la publication est déjà référencée
        var content = download[0];
        if (req.body.type === "script") {
          content.script++;
        } else {
          content.audio++;
        }
        Download.updateOne({ title: req.body.title }, content)
          .then(() => {
            console.log("Téléchargement comptabilisé");
            res
              .status(201)
              .json({ message: "Compteur de téléchargements mis à jour" });
          })
          .catch(err =>
            console.log("Il y a eu une erreur lors du téléchargement", err)
          );
      } else {
        // Sinon c'est la première fois qu'on télécharge pour cet audio
        if (req.body.type === "script") {
          var scriptNb = 1;
          var audioNb = 0;
        } else {
          var scriptNb = 0;
          var audioNb = 1;
        }
        const download = new Download({
          title: req.body.title,
          audio: audioNb,
          script: scriptNb
        });
        download
          .save()
          .then(() =>
            res
              .status(201)
              .json({ message: "Nouveau téléchargement enregistré" })
          )
          .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(err => console.log(err));
};

exports.sendDownloads = (req, res, next) => {
  Download.find()
    .then(downloads => {
      res.status(200).json(downloads);
      console.log("On a tout trouvé");
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};

exports.sendSubscribers = (req, res, next) => {
  Newsletter.find()
    .then(subscribers => {
      res.status(200).json(subscribers);
      console.log("\n On a trouvé les abonnés à la NL");
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};
