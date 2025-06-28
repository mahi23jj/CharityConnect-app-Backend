const express = require('express')
// const router = require('./Book/router/book_route')
const registration = require('./features/autentication/router/user_router')
const content = require('./features/content/router/contentrouter')
const comment = require('./features/comment/router/commentrouter')
const like = require('./features/content/router/likerouter')
const db = require('./config/db')
const cors = require('cors');
const app= express()
db()



app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
// app.use('/api/books',router)
app.use('/api/auth',registration)
app.use('/api/content',content)
app.use('/api/comment',comment)
app.use('/api/like',like)


app.listen(5000,
    ()=>{
        console.log('it is running on port 5000')
    }
)


module.exports=app;

