// --------ASSIGNMENT 13YH APRIL ---------

const res = require('express/lib/response')
const { timeout } = require('nodemon/lib/config')
const authormodel = require('../models/authormodel')
const bookmodel = require('../models/newbookmodel')

const createAuthor = async function(req,res){
    let data = req.body
    let authordetail = await authormodel.create(data)
    res.send({ msg: authordetail})
}

const createbook = async function(req,res){
    let data = req.body
    let bookdetail = await bookmodel.create(data)
    res.send({ msg: bookdetail})
}

const allBooks = async function(req,res){
    const authordetail = await authormodel.find({ author_name: "Peter parker"})
    const id = authordetail[0].author_id
    const bookname = await bookmodel.find({author_id: id}).select({Bookname:1})
    res.send({ msg: bookname})
}

const updateprice = async function(req,res){
    const bookdetail = await bookmodel.find({Bookname:"Ironman 1"})
    const id = bookdetail[0].author_id
    const author = await authormodel.find({author_id:id}).select({author_name:1,_id:0})

    const bookname = bookdetail[0].name
    const updateprice = await bookmodel.findOneAndUpdate({name:bookname},{price:150},{new:true}).select({price:1,_id:0})
    res.send({msg:author, updateprice})
}

const authorName = async function(req,res){
    const booksid = await bookmodel.find({price: {$gte:50,$lte:150}}).select({author_id:2, _id:0})
    const id = booksid.map(inp => inp.author_id)
    console.log(id)

    let temp = []
    for (let i = 0; i< id.length; i++){
        let x = id[i]
        const author = await authormodel.find({author_id:x}).select({author_name:1, _id:0})
        temp.push(author)
    }
    const authorname = temp.flat()
    res.send({ msg: authorname})
}


module.exports.createAuthor = createAuthor
module.exports.createbook = createbook
module.exports.allBooks = allBooks
module.exports.updateprice= updateprice
module.exports.authorName = authorName