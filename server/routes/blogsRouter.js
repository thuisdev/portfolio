const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, getBlogById, updateBlogById, deleteBlogById } = require("../db/blogQueries")
const { checkAuth} = require ("../middleware/auth-middleware")

// Get all Blogs
router.get('/', async (req, res) => {
    try {const blog = await getAllBlogs() 
    res.json(blog)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
});

// Get Blog by id
router.get('/:id', async (req, res) => {
    const blogId = req.params.id
    try{ 
        const blog = await getBlogById(blogId)
        if (blog.length === 0) {
            return res.status(404).json({ error: 'Blog not found'})
    }  
        res.json(blog)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})}
});


// Create a new Blog
router.post('/', checkAuth, async (req, res) => {
    const {title, content, blogPrvText, blogImgSrc, userId} = req.body
    try{
        if (!title || !content || !blogPrvText || !blogImgSrc || !userId) {
            return res.status(400).json({error : 'Data not valid'})
        }
        const blog = await createBlog(title, content, blogPrvText, blogImgSrc, userId)
        res.json(blog)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})}
});

// Update a Blog by id
router.put('/:id', checkAuth, async (req, res) => {
    const blogId = req.params.id
    const {title, content, blogPrvText, blogImgSrc, userId} = req.body
    try{
        if (!title || !content || !blogPrvText || !blogImgSrc || !userId) {
                return res.status(400).json({error : 'Data not valid'})
        } 
               
        const blog = await updateBlogById(title, content, blogPrvText, blogImgSrc, blogId, userId)
        res.json(blog)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})}
});

// Delete Blog by id
router.delete('/:id', checkAuth, async (req, res) => {
    const blogId = req.params.id
    try{
        const blog = await deleteBlogById(blogId)
        if (blog.length === 0) {
            return res.status(404).json({error: 'Blog not found'})
        }
        res.json(blog)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})}
})


module.exports = router;