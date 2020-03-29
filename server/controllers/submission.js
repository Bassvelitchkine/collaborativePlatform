var nodemailer = require("nodemailer");

// FIRST WE CREATE A FUNCTION THAT'LL HELP US

async function sendSubmission(res, dataToSend) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "", // A COMPLETER
    port: 465, // A CHANGER EVENTUELLEMENT
    secure: true, // true for 465, false for other ports
    auth: {
      user: "", // L'ADRESSE MAIL DEPUIS LAQUELLE ON ENVOIE
      pass: "" // MOT DE PASSE DE L'ADRESSE MAIL DEPUIS LAQUELLE ON ENVOIE
    }
  });
  // send mail with defined transport object
  let info = await transporter.sendMail(dataToSend);
  console.log("Message sent: %s", info.messageId);
  res.send({
    // `data` is the response that was provided by the server
    data: {},
    // `status` is the HTTP status code from the server response
    status: 200,
    // `statusText` is the HTTP status message from the server response
    statusText: "OK",
    // `headers` the headers that the server responded with
    // All header names are lower cased
    headers: {},
    // `config` is the config that was provided to `axios` for the request
    config: {},
    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance the browser
    request: {}
  });
}

// Then we define the actual function to export
exports.sendMail = (req, res) => {
  const arrayFilenames = req.body.filenames;
  const arrayFiles = req.body.files;

  var arrayAttachments = arrayFilenames.map((file, index) => {
    return {
      filename: file,
      content: new Buffer.from(arrayFiles[index].split("base64,")[1], "base64")
    };
  });

  var dataToSend = {
    from: '"Website 👻" <submission@site.com>', // sender address
    to: "", // ADRESSE MAIL QUIE RECOIT LES CONTRIBUTIONS
    subject: "Submission ✔", // Subject line
    text:
      "Pseudo : " +
      req.body.pseudo +
      "\n Contact : " +
      req.body.contact +
      "\n Titre : " +
      req.body.titre +
      "\n Message : " +
      req.body.message, // plain text body
    attachments: arrayAttachments
  };
  sendSubmission(res, dataToSend);
};
