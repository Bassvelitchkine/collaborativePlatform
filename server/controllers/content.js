// Here we take care of the content rendering. We serve the element requested by the client
const path = require("path");
const fs = require("fs");

exports.sendPublications = (req, res) => {
  res.send(scripts);
};

exports.sendFile = (req, res) => {
  console.log(req.params.filename);
  fs.readFile(
    path.resolve(__dirname, "../data/" + req.params.filename),
    { encoding: "base64" },
    (err, data) => {
      if (err) throw err;
      res.status(201).json({ file: data });
    }
  );
};
