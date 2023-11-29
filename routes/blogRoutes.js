// Import Express and Blog model
const express = require('express')
const Blog = require('../models/blogs')

// Create a new router object to handle requests
const router = express.Router()

// Blog routes. Route responds to GET requests on the root URL ('/')
router.get('/',(req,res) =>{
    Blog.find().sort({ createdAt: -1}) // Outputs blog posts in descending order of time
        .then((result)=>{
            res.render('index',{title: 'All Blogs,', blogs: result})
        })
        .catch((err)=>console.log(err))
})

// Route to create a new blog. Route responds to POST requests on the root URL ('/')
router.post('/', (req, res) =>{
    const blog = new Blog(req.body)
    blog.save() // Save the new blog to the database
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err)
    })

})

// Route displays blog creation form. Responds to GET requests on '/create'
 router.get('/create',(req,res)=>{
     res.render('create', {title: 'Create new Blog'})
 })


// Route to specific blog by its ID. GET requests on '/:id' where :id is a placeholder
 router.get('/:id',(req,res)=>{
    // Extract blog ID from the request parameters
    const id = req.params.id
    // Find the blog by its ID
    Blog.findById(id)
        .then((result) =>{
            res.render('details', {blog: result, title: 'Blog Content'})
        })
        .catch((err)=>{
            res.render('404',{title: 'Blog not found'})
        })
})

// Route to delete a blog by ID. Responds to DELETE requests on '/:id'
router.delete('/:id',(req,res)=>{
    // Extract the blog ID from the request parameters
    const id = req.params.id

    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect: '/blogs'})
    })
    .catch((err)=>console.log(err))
})

module.exports = router //exporting the router