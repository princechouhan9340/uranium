const bookModel= require("../booklibrary/booklibrary")

const createbook= async function (req, res) {
    let data= req.body
    let savedData= await bookModel.create(data)
    res.send({msg: savedData})
}

const getbookData= async function (req, res) {
    let allAuthor= await bookModel.find()
    res.send({msg: allAuthor})
}

module.exports.createbook= createbook
module.exports.getbookData= getbookData