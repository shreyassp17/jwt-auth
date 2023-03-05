//imports
require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json()) //lets our application use json from the body that gets passed inside of requests

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next() //to move on from the middleware
    })
}

const posts = [
    {
        username: "Shreyas",
        title: "Part1"
    },
    {
        username: "Marques",
        title: "Part2"
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    console.log("FFF", req.user)
    res.json(posts.filter(post => post.username === req.user.name))
}
)

app.listen(3000)