const jwt = require("jsonwebtoken");

const auth = async function (req, res, next) {
    try {
        let token = req.headers["token"];
        if (!token) token = req.headers["Token"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be require" })
        let decodedToken = jwt.verify(token, "prince15022000");
        console.log(decodedToken)
        if (!decodedToken)
            return res.status(400).send({ status: false, msg: "token is invalid" });
        let userid = decodedToken.userId
        console.log(userid)
        next()
        
    }
   
    
    catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
}
}

module.exports.auth = auth
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYxOGFhNTllMjRiMmNlMjhlOGFmMDYiLCJiYXRjaCI6InVyYW5pdW0iLCJvcmdhbmlzYXRpb24iOiJGVW5jdGlvblVwIiwiaWF0IjoxNjUwNjE0NjA3fQ.fB9CU4U7PkGrAbCr-NjcQOm8hlIXdrlQpPVDZFsNgeo
