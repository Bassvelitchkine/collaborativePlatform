const multer = require("multer");

fields = [
  { name: "audio", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
  { name: "image", maxCount: 1 }
];

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "data");
  },
  filename: (req, file, callback) => {
    const temp = file.originalname.split(".");
    var name = temp[0]
      .toLowerCase()
      .split(" ")
      .join("");
    const extension = temp[1].toLowerCase();
    if (extension != "pdf" && extension != "mp3") {
      name = name + "_" + Date.now();
    }
    callback(null, name + "." + extension);
  }
});

module.exports = multer({ storage: storage }).fields(fields);
