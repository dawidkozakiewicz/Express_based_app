const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('MongoDB://localhost/nodekb')
let db = mongoose.connection


// check connection

db.once('open', () => {
    console.log('Connected to MongoDB')
})


//check for DB errors


db.on('error', (err) => {
    console.log(err)
})


//init App

const app = express()

//Bring in Models


let Article = require('./models/article')

// Load View Engine

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Home Route

// let articles = [
//     {
//         id: 1,
//         title: 'Przygody Koziołka Matołka',
//         author: 'Kornel Makuszyński',
//         body: 'książka nr: 1'
//     },
//     {
//         id: 2,
//         title: 'Konstytucja',
//         author: 'Aleksander Kwaśniewski',
//         body: 'książka nr: 2'
//     },
//     {
//         id: 3,
//         title: 'Koran',
//         author: 'Biggest idiot on the wordld',
//         body: 'książka nr: 3'
//     }
// ]

app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err)
        } else {
            res.render('index', {
                title: 'Hello David',
                articles: articles
            })
        }
    })
})

// Add Route

app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    })
})


// Start Server

app.listen(3001, () => {
    console.log('server started at port 3001...')

})