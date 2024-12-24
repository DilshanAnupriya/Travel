const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const TravelRoute = require('./Routes/TravelerRoute');


const app = express();
app.use(bodyParser.json());

mongoose.connect(MONGO_URL).then(()=>{
    console.log('Mongo DB connected......');
}).catch(e=>{
    console.log(e);
    
});

app.use('/api/v1/travelers', TravelRoute);


app.listen(PORT,()=>{
    console.log(`server started and running on ${PORT}`);
})
