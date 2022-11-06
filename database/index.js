const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URI

function Dbconnect(){
    mongoose.connect(MONGO_URL)

    mongoose.connection.on('connected', ()=>{
        console.log('MongoDb connected succesfully')
    })

    mongoose.connection.on('error', (err)=>{
        console.log('error connecting')
    })
}

module.exports = { Dbconnect }