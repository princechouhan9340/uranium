const blogModel = require('../model/blogModel')
const authorModel = require('../model/authorModel')


const changeDatabase = async (req, res) => {

  const data = await authorModel.update(
      {},
      [{ $set: { email: { $toLower: "$email" } } }],
      { multi: true }
    )

 // const data = await (blogModel.find())

  const update = async function () {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].category.length; j++) {
        data[i].category[j] = data[i].category[j].toLowerCase()
      }
      await blogModel.updateOne({ _id: data[i]._id }, { $set: { category: data[i].category } })
    }
  }


  return res.send("")

}

module.exports.changeDatabase = changeDatabase;