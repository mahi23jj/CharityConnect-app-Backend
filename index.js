const express = require('express')
const router = require('./Book/router/book_route')
const app= express()

app.use(express.json())
app.use('/api/books',router)

app.listen(3000,
    ()=>{
        console.log('it is running on port 3000')
    }
)


module.exports=app;

