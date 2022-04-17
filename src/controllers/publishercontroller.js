
const publisherModel=require("../models/publisherModel")

const createPublisherData= async function (req, res) {
    let body1 = req.data
    let publisher = await publisherModel.create(body1)
    res.send({data: publisher})
}

module.exports.createPublisherData = createPublisherData