const express = require('express')
const { Dbconnect } = require('./database/index')
const bodyParser = require('body-parser')
const passport = require('passport')
const  userRoute  = require('./routes/user')
const postRoute = require('./routes/blog')

require('dotenv').config()


const PORT = process.env.PORT || 4000

const app = express()
Dbconnect()
app.use(bodyParser.urlencoded({extended: false}))

require('./middleware/authentication')
app.use(express.json())

app.use('/', userRoute)
app.use('/post', postRoute)


app.get('/', (req, res)=>{
    res.send('welcome')
})

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

app.listen(PORT, ()=>{
    console.log('server started succesfully')
})
