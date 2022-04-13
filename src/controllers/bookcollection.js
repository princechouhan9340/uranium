const BookModel = require("../models/bookModel")

const inputBook = async function (req, res) {

    // ------PLEASE ONLY UNCOMMENT THOSE TOU NEED TO RUN ------
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})

    // //PROBLEM - 3
    let year = req.body.publish_year
    let getBooksInYear = await BookModel.find({publish_year: year})
    res.send({msg: getBooksInYear})


    // PROBLEM -4
    let data1 = req.body
    let getParticularBooks = await BookModel.find({ $or: [{bookName: data1.bookName}, {publish_year: data1.publish_year},{authorName:data1.authorName},{isPublished: data1.isPublished} ]})
    res.send({ msg: getParticularBooks })
}

const getBooksData = async function (req, res) {
    //PROBLEM -1
    let allBooks= await BookModel.find().count()
    res.send({msg: allBooks})


    //PROBLEM -2    
    let bookList= await BookModel.find().select({bookName: 1, authorName: 1, _id:0})
    res.send({msg: bookList})






    // PROBLEM -5
    let getXINRBooks = await BookModel.find({ indianPrice :{$in: ["100INR","200INR","500INR"]}})
    res.send({ msg: getXINRBooks})

    // PROBLEM -6
    let allBooks2= await BookModel.find({ $or: [{stock: { $gt:  0}},{page:{$gt: 500}} ]}) 
    res.send({msg: allBooks2})

}

module.exports.inputBook = inputBook
module.exports.getBooksData = getBooksData