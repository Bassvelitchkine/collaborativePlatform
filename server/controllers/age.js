var isUnderage = true;

exports.getAge = (req, res) => {
  const data = req.body;
  isUnderage = data.isUnderage;
  console.log("Clic popup !");
  res.end();
};

exports.sendAge = (req, res) => {
  res.send({ isUnderage: isUnderage });
};
