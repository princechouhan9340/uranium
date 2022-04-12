const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const { use } = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://prince_chouhan0001:MkWvbELHlX3jlIxh@cluster0.7obeg.mongodb.net/test",{
useNewUrlParser : true
})
.then(() => console.log("mongoosbd connected"))
.catch( err => console.log(err))
app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
