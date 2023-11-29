// Import required modules
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogroutes.js')

// Load environment variables
require('dotenv').config();

// Initialize the Express application
const app = express()

// Connect to MongoDB
mongoose.connect(process.env.DB_URI) // Use the environment variable for the DB URI. Create .env file
    .then((result)=> app.listen(3000))
    .catch((err)=>console.log(err))

app.set('view engine', 'ejs')

// Middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

app.use(morgan('dev'))

// Route to main page
app.get('/',(req,res)=>{
    res.redirect('/blogs') 
})

// About page route
app.get('/about',(req,res)=>{

    res.render('about', {title: 'About'})

})

// Blog Routes. In Other files for organization
app.use('/blogs', blogRoutes)

// 404 page Not Found route
app.use((req,res)=>{
    res.status(404).render('404', {title: '404'})
})

