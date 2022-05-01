const blogsModel = require("../model/blogModel")
const authorModel = require("../model/authorModel")
var mongoose = require('mongoose');

// const STA = function (string) {
//     const arr = string.split(',')
//     for (let i = 0; i < arr.length; i++)
//         arr[i] = arr[i].toLowerCase().trim()

//     return arr;
// }
// const trimLower = function (obj) {
//     for (let key in obj) {
//         if (typeof (obj[key]) == "string") {
//             obj[key] = obj[key].toLowerCase().trim()
//         }
//         if (Array.isArray(obj[key])) {
//             for (let i = 0; i < obj[key].length; i++) {
//                 obj[key][i] = obj[key][i].toLowerCase().trim()
//             }
//         }
//     }
//     return obj;
// }

// const csi = (obj,arr)=>{
//         for ( let key in obj){
//             if(arr.findIndex(obj[key]!=-1))
//                 if (typeof (obj[key]) == "string") 
//                  obj[key] =  { $regex : `/${obj[key]}/i`}
//         }
//         return obj;
// }

const createBlogs = async (req, res) => {
    try {
        let data = req.body
        //---new----
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: true, msg: "input empty" })
        }
        if (data.title == undefined || data.body == undefined || data.authorId == undefined || data.category == undefined) {
            return res.status(400).send({ status: false, msg: "Enter Mandentory Feilds" })
        }
        // datatype checking changed now category,sub category,tags are also accepted as strings
        // if (typeof (data.title) != "string" || typeof (data.body) != "string" || !(Array.isArray(data.tags) || typeof (data.tags) == 'string') || !(Array.isArray(data.subcategory) || typeof (data.subcategory) == "string") || !(Array.isArray(data.category) || typeof (data.category) == 'string')) {
        //     return res.status(400).send({ status: false, msg: "invalid input" })
        // }
        if (typeof (data.title) != "string" || typeof (data.body) != "string" || !Array.isArray(data.tags) || !Array.isArray(data.subcategory) || !Array.isArray(data.category)) {
            return res.status(400).send({ status: false, msg: "invalid input" })
        }
        // removing extra spaces from every array's input
        for (let key in data) {
            if (Array.isArray(data[key])) {
                let arr=[];
                for (let i = 0; i < data[key].length; i++) {
                        if(data[key][i].trim().length>0)
                    arr.push(data[key][i].toLowerCase().trim())
                }
                data[key] = [...arr];
            }
        }
        if (data.isPublished) {
            if (data.isPublished == true) {
                data.publishedAt = new Date();
            }
        }
        let isValid = mongoose.Types.ObjectId.isValid(data.authorId);
        if (!isValid) { return res.status(400).send({ status: false, msg: "Author Id is Not Valid " }) }
        const get_data = await authorModel.findOne({ _id: data.authorId })
        if (!get_data) {
            return res.status(400).send({ status: false, msg: "Author not found.." })
        }
        // if tags,category,subcategory coming as string convert them as array
        // if (data.tags && typeof (data.tags) == 'string')
        //     data.tags = STA(data.tags)
        // if (data.category && typeof (data.category) == 'string')
        //     data.category = STA(data.category)
        // if (data.subcategory && typeof (data.subcategory) == 'string')
        //     data.subcategory = STA(data.subcategory)

        const result = await blogsModel.create(data)
        res.status(201).send({ staus: true, msg: result })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const getBlogs = async function (req, res) {
    try {
        const { authorId, category, tags, subcategory } = req.query
        console.log(tags)
        if (authorId) {
            let isValid = mongoose.Types.ObjectId.isValid(authorId);
            if (!isValid) { return res.status(400).send({ status: false, msg: "Author Id is Not Valid" }) }
        }
        const obj = {
            isDeleted: false,
            isPublished: true
        }
        if (authorId)
            obj.authorId = authorId.trim();
        const obj2 = {}
        if (category) {
            obj2.category = category
        }
        if (tags) {
            obj2.tags = tags
        }
        if (subcategory)
            obj2.subcategory = subcategory

        for (let key in obj2) {
            if (typeof (obj2[key]) == "string") {
                obj2[key] = obj2[key].split(",")
            }
            for (let i = 0; i < obj2[key].length; i++)
                obj2[key][i] = obj2[key][i].toLowerCase().trim()
            obj2[key] = { $all: obj2[key] }
        }
        const data = await blogsModel.find({ ...obj, ...obj2 })
        if (data.length == 0) {
            return res.status(404).send({ status: false, msg: "Blogs Not found" })
        }
        res.status(200).send({ status: true, data: data })
    }
    catch (err) {
        res.status(500).send({ status: true, msg: err.message })
    }
}


const updateBlogs = async function (req, res) {
    try {
        if (Object.keys(req.body).length == 0) { return res.send({ status: false, msg: "Provide some data" }) }

        // if ((typeof (req.body.title) != "string" && typeof (req.body.title) != "undefined") || (typeof (req.body.body) != "string" && typeof (req.body.body) != "undefined") || (typeof (req.body.isPublished) != "boolean" && typeof (req.body.isPublished) != "undefined") || (!(Array.isArray(req.body.tags) || typeof (req.body.tags) == "string") && typeof (req.body.tags) != "undefined") || (!(Array.isArray(req.body.subcategory) || typeof (req.body.subcategory) == "string") && typeof (req.body.subcategory) != "undefined")) {
        //     return res.status(400).send({ status: false, msg: "invalid input" })
        // }

        let { title, body, isPublished, tags, subcategory } = req.body;
        if ((typeof (title) != "string" && typeof (title) != "undefined") || (typeof (body) != "string" && typeof (body) != "undefined") || (typeof (isPublished) != "boolean" && typeof (isPublished) != "undefined") || (!Array.isArray(tags) && typeof (tags) != "undefined") || (!Array.isArray(subcategory) && typeof (subcategory) != "undefined")) {
            return res.status(400).send({ status: false, msg: "invalid input" })
        }

        let obj = {}
        if (req.body.title)
            obj.title = req.body.title.trim().toLowerCase();
        if (req.body.body)
            obj.body = req.body.body.trim().toLowerCase();
        if (req.body.isPublished == true) {
            obj.isPublished = true;
            obj.publishedAt = new Date();
        }
        const result = await blogsModel.findOneAndUpdate({ _id: req.params.blogId, isDeleted: false }, { $set: obj }, { new: true })
        if (!result) { return res.status(404).send({ status: false, msg: "Blog not found" }) }
        // tags and body can now accept string 
        if (data.tags) {
            // if (typeof (req.body.tags) == "string")
            //     req.body.tags = STA(req.body.tags)
            let arr=[]
                    for (let i = 0; i < data.tags.length; i++) {
                            if(data.tags[i].trim().length>0)
                        arr.push(data.tags[i].toLowerCase().trim())
                    }
                    
            result.tags = result.tags.concat(arr)
        }
        if (data.subcategory) {
            // if (typeof (req.body.subcategory) == "string")
            //     req.body.subcategory = STA(req.body.subcategory)

            //removing spaces from array elements
            let arr=[]
            for (let i = 0; i < data.subcategory.length; i++) {
                    if(data.subcategory[i].trim().length>0)
                arr.push(data.subcategory[i].toLowerCase().trim())
            }
            
            result.subcategory = result.subcategory.concat(arr)
        }
        result.save()
        res.status(201).send({ status: true, result })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId.trim();
        let date = new Date()
        const result = await blogsModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true, deletedAt: date })
        if (!result)
            return res.status(404).send({ status: false, msg: "blog not found" })
        console.log(result, "deleted")
        res.status(200).send("")
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const deleteBlogs = async (req, res) => {
    try {

        let keyArr = Object.keys(req.query)
        let somethingBad = false;
        // checking any unwanted key coming or not
        for (let i = 0; i < keyArr.length; i++) {
            if (!(keyArr[i] == "category" || keyArr[i] == "tags" || keyArr[i] == "subcategory" || keyArr[i] == "isPublished" || keyArr[i] == "authorId"))
                somethingBad = true;
        }
        // if we got any unwanted key or empty body
        if (somethingBad || keyArr.length == 0) {
            return res.status(400).send({ status: false, msg: "invalid input" })
        }
        //extracting keys from req.query
        let { category, tags, subcategory, isPublished, authorId } = req.query
        // if we're getting authorId in request but not matching with tokenId
        if (authorId && authorId != req.tokenId)
            return res.status(403).send({ status: false, msg: "Unauthorised access" })
        let obj = {
            authorId : req.tokenId,
            isDeleted:false
        }
        if(typeof(isPublished)!=undefined)
            obj.isPublished=isPublished;
        let obj2 = {}
        if (category) {
            obj2.category = category
        }
        if (tags) {
            obj2.tags = tags
        }
        if (subcategory)
            obj2.subcategory = subcategory
                // making query oriented object for arrays because array  comparision done like {array_name :{$all : input_array}}
        for (let key in obj2) {
            if (typeof (obj2[key]) == "string") {
                obj2[key] = obj2[key].split(",")
            }
            for (let i = 0; i < obj2[key].length; i++)
                obj2[key][i] = obj2[key][i].toLowerCase().trim()
            obj2[key] = { $all: obj2[key] }
        }
        let date = new Date()
        const data = await blogsModel.updateMany({ ...obj, ...obj2 }, { $set: { isDeleted: true, deletedAt: date } })
        if (data.matchedCount == 0)
            return res.status(404).send({ status: false, msg: "blog not found" })
        res.status(200).send({ status: true, data: "finally deleted Successfull " + data.matchedCount + " documents" })
    }
    catch (err) {
        res.send({ msg: err.message })
    }
}


module.exports.getBlogs = getBlogs;
module.exports.createBlogs = createBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogs = deleteBlogs;



