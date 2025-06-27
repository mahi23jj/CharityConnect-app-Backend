const express = require('express')
// const router = require('./Book/router/book_route')
const registration = require('./features/autentication/router/user_router')
const content = require('./features/content/router/contentrouter')
const comment = require('./features/comment/router/commentrouter')
const like = require('./features/like/route/likerouter')
const db = require('./config/db')
const app= express()
db()



app.use(express.json())
// app.use('/api/books',router)
app.use('/api/auth',registration)
app.use('/api/content',content)
app.use('/api/comment',comment)
app.use('/api/like',like)


app.listen(3000,
    ()=>{
        console.log('it is running on port 3000')
    }
)


module.exports=app;

