const Publication = require("../models/publication");
const Download = require("../models/download");
const Newsletter = require("../models/newsletter");

exports.downloadAll = (req, res, next) => {
  Publication.find()
    .then(publications => {
      Download.find()
        .then(downloads => {
          Newsletter.find()
            .then(newsletters => {
              console.log(newsletters, publications, downloads);
              res.status(200).json({
                publications: publications,
                newsletter: newsletters,
                downloads: downloads
              });
            })
            .catch(error => {
              res.status(400).json({
                error: error
              });
            });
        })
        .catch(error => {
          res.status(400).json({
            error: error
          });
        });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};
