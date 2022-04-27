const jwt = require("jsonwebtoken");
const user2Model = require('../models/user2Model')

const auth2 = async function (req, res, next) {
  try {
    let userId = req.params.userId;
    let userid = await user2Model.findById(userId);
    if (!userid) return res.status(400).send("No such userid user exists")
    let token = req.headers["token"];
    if (!token) token = req.headers["Token"];
    if (!token) return res.status(400).send({ status: false, msg: "token must be require" })
    let decodedToken = jwt.verify(token, "prince15022000");
    console.log(decodedToken)
    if (!decodedToken)
      return res.status(400).send({ status: false, msg: "token is invalid" });
    let tokenuserid = decodedToken.userId
    console.log(tokenuserid)
    if (userId != tokenuserid) return res.status(400).sent({ status: false, msg: "not able to post" })
    next()
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
}
}
module.exports.auth2 = auth2