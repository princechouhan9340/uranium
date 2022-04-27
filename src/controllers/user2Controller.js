const user2Model = require('../models/user2Model')
const jwt = require("jsonwebtoken");

//---problem-1
const createuser2 = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let savedData = await user2Model.create(data)
      res.status(201).send({ msg: savedData })
    }
    else res.status(400).send({ msg: "BAD REQUEST" })
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}

//---problem-2
const loginUser = async function (req, res) {
  try {
    let username = req.body.emailId
    let password = req.body.password
    if (!username && !password) {
      res.status(400).send({ msg: "BAD REQUEST" })
    }
    else{let userDetails = await user2Model.findOne({ emailId: username, password: password })
    //console.log(userDetails)
    if (!userDetails) return res.status(400).send({ status: false, msg: "invalid username or password" })
    let token = jwt.sign(
      {
        userId: userDetails._id.toString(),
        batch: "uranium",
        organisation: "FUnctionUp",
      },
      "prince15022000"
    );

    res.status(201).send({ status: true, data: token })
    }
  }
  // token- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYxOGFhNTllMjRiMmNlMjhlOGFmMDYiLCJiYXRjaCI6InVyYW5pdW0iLCJvcmdhbmlzYXRpb24iOiJGVW5jdGlvblVwIiwiaWF0IjoxNjUwNTYxNDEzfQ.CSOZRHccrQ1GeftoHupncwoJY6O1L2_v8OEyQs24faA
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}


//---problem-3

const getdata = async function (req, res) {
  try {
    let userId = req.params.userId;
    console.log(userId)
    if (!userId) {
      res.status(400).send({ msg: "BAD REQUEST" })
    }
    let userDetails = await user2Model.findById(userId);
    if (!userDetails)
      return res.status(400).send({ status: false, msg: "No such user exists" });

    res.status(201).send({ status: true, data: userDetails });
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }

}

//---problem-4

let updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    if (!userid) {
      res.status(400).send({ msg: "BAD REQUEST" })
    }
    let userid = await user2Model.findById(userId);
    if (!userid) return res.status(400).send("No such userid user exists")

    let data = req.body
    const updateUser = await user2Model.findOneAndUpdate({ _id: userId }, data)
    res.status(201).send({ status: updateUser, data: updateUser });
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYxOGFhNTllMjRiMmNlMjhlOGFmMDYiLCJiYXRjaCI6InVyYW5pdW0iLCJvcmd
//----problem-5

let deleteapi = async function (req, res) {
  try {
    let userId = req.params.userId;
    if (!userId) {
      res.status(400).send({ msg: "BAD REQUEST" })
    }
    let userid = await user2Model.findById(userId);
    if (!userid) return res.status(400).send("No such userid user exists")

    let isdelete = req.body;
    let updatedisdelete = await user2Model.findOneAndUpdate({ _id: userId }, isdelete);
    res.status(201).send({ status: updatedisdelete, data: updatedisdelete });
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}

let userpost = async function (req, res) {
  try {
    let userId = req.params.userId;
    if (!userId) {
      res.status(400).send({ msg: "BAD REQUEST" })
    }
    let data = req.body
    const updateUser = await user2Model.findOneAndUpdate({ _id: userId }, data)
    res.status(201).send({ status: updateUser, data: updateUser });
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}





module.exports.getdata = getdata
module.exports.createuser2 = createuser2
module.exports.loginUser = loginUser
module.exports.updateUser = updateUser
module.exports.deleteapi = deleteapi
module.exports.userpost = userpost