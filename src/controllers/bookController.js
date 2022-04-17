
const bookModel = require("../models/bookModel")
const authorModel = require("../models/authorModel")
const publisherModel = require("../models/publisherModel")

const createBooksData = async function (req, res) {
    let data = req.body
    const author = data.author_id

    const publisher = data.publisher_id
    //console.log(publisher)
    const authorids = await authorModel.find().select({ _id: 1 })
    //console.log(authorids)
    const publisherids = await publisherModel.find().select({ _id: 1 })
    //console.log(publisherids)

    for (let j = 0; j < authorids.length; j++) {
        let x = (authorids[j]._id).toString();
        //  console.log(author)
        //  console.log(x)
        if (author !== x) {
            // console.log("xyz")
            continue;
        }
        for (let i = 0; i < publisherids.length; i++) {
            let y = (publisherids[i]._id).toString();
            // console.log(y)
            // console.log(publisher)
            if (publisher !== y) {
              //console.log("publisher id not match")
                continue;
            }
            let newbook = await bookModel.create(data)
            res.send({ data: newbook })
        }

    }
}


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { isHardCover: true} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )

const heardcover = async function (req, res) {
    let updateBooks = await bookModel.updateMany(
        { publisher_id:"62596ecfb7cfe3320a6065fa" },
        { $set: { isHardCover: true } },
        { new: true , upsert: true}
    )
    res.send({ msg: updateBooks });
}

const updateBookprice = async function(req, res){
    let data = await bookModel.updateMany(
        {ratings:{$gt: 3.5}},
        {$inc: {price:10}}
    )
    res.send({msg: data});
}
module.exports.heardcover = heardcover
module.exports.updateBookprice = updateBookprice
module.exports.createBooksData = createBooksData

