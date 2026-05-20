const request = require('supertest')
const app = require('../app')

// Mocking
jest.mock('../db/blogQueries')
jest.mock('../middleware/auth-middleware')

const { getAllBlogs, createBlog, getBlogById, updateBlogById, deleteBlogById } = require("../db/blogQueries")
const { checkAuth } = require("../middleware/auth-middleware")


// Get all Blogs
describe('GET /api/blogs', () => {
    it('should return all blogs and status 200', async () => {
        getAllBlogs.mockResolvedValue([{
            blog_id: 1,
            user_id: 1,
            title: 'title',
            content: 'content',
            blogPrvText: 'blogPrvText',
            blogImgSrc: 'blogImgSrc'
        }])
        const response = await request(app)
            .get('/api/blogs');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            blog_id: 1,
            user_id: 1,
            title: 'title',
            content: 'content',
            blogPrvText: 'blogPrvText',
            blogImgSrc: 'blogImgSrc'
        }])
    })

    it('should return empty array of blogs and status 200', async () => {
        getAllBlogs.mockResolvedValue([])
        const response = await request(app)
            .get('/api/blogs');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([])
    })

    it('should return server error 500', async () => {
        getAllBlogs.mockRejectedValue(new Error('DB Error'))
        const response = await request(app)
            .get('/api/blogs')

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal server error')
    })
})


// Get Blog by id
describe('GET /api/blogs/:id', () => {
    it('should return blog by id and status 200', async () => {
        getBlogById.mockResolvedValue([{
            blog_id: 1,
            user_id: 1,
            title: 'title',
            content: 'content',
            blogPrvText: 'blogPrvText',
            blogImgSrc: 'blogImgSrc'
        }])
        const response = await request(app)
            .get('/api/blogs/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            blog_id: 1,
            user_id: 1,
            title: 'title',
            content: 'content',
            blogPrvText: 'blogPrvText',
            blogImgSrc: 'blogImgSrc'
        }])
    })

    it('should return no blog not found and status 404', async () => {
        getBlogById.mockResolvedValue([])
        const response = await request(app)
            .get('/api/blogs/1');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Blog not found')
    })

    it('should return server error 500', async () => {
        getBlogById.mockRejectedValue(new Error('DB Error'))
        const response = await request(app)
            .get('/api/blogs/1')

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal server error')
    })
})


// Create a new Blog
describe('POST /api/blogs', () => {
    it('should create a blog and return status 200', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        createBlog.mockResolvedValue({
            userId: 1,
            title: 'title',
            content: 'content',
            blogPrvText: 'blogPrvText',
            blogImgSrc: 'blogImgSrc'
        })

        const response = await request(app)
            .post('/api/blogs')
            .send({
                userId: 1,
                title: 'title',
                content: 'content',
                blogPrvText: 'blogPrvText',
                blogImgSrc: 'blogImgSrc'
            })

        expect(response.status).toBe(200)
        expect(response.body.title).toBe('title')
    })

    it('should return 401 if user is unauthorized', async () => {
        checkAuth.mockImplementation((req, res, next) => res.status(401).send('Access denied'))
        createBlog.mockResolvedValue({
            userId: 1,
            title: 'title',
            content: 'content',
            blogPrvText: 'blogPrvText',
            blogImgSrc: 'blogImgSrc'
        })

        const response = await request(app)
            .post('/api/blogs')
            .send({
                userId: 1,
                title: 'title',
                content: 'content',
                blogPrvText: 'blogPrvText',
                blogImgSrc: 'blogImgSrc'
            })

        expect(response.status).toBe(401)
        expect(response.text).toBe('Access denied')
    })

    it('should return 400 if input fields are empty', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        createBlog.mockResolvedValue({
            userId: 1,
            title: '',
            content: '',
            blogPrvText: '',
            blogImgSrc: ''
        })

        const response = await request(app)
            .post('/api/blogs')
            .send({
                userId: 1,
                title: '',
                content: '',
                blogPrvText: '',
                blogImgSrc: ''
            })

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Data not valid')
    })

    it('should return server error 500', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        createBlog.mockRejectedValue(new Error('DB Error'))

        const response = await request(app)
            .post('/api/blogs')
            .send({
                userId: 1,
                title: 'title',
                content: 'content',
                blogPrvText: 'blogPrvText',
                blogImgSrc: 'blogImgSrc'
            })


        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal server error')
    })
})


// Update a Blog by id
describe('PUT /api/blogs/:id', () => {
    it('should update blog and status 200', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        updateBlogById.mockResolvedValue({
            userId: 1,
            title: 'title',
            content: 'content',
            blogPrvText: 'blogPrvText',
            blogImgSrc: 'blogImgSrc',
            blogId: 1
        })

        const response = await request(app)
            .put('/api/blogs/1')
            .send({
                userId: 1,
                title: 'title',
                content: 'content',
                blogPrvText: 'blogPrvText',
                blogImgSrc: 'blogImgSrc',
                blogId: 1
            })

        expect(response.status).toBe(200)
        expect(response.body.title).toBe('title')
    })

    it('should return 401 if user is unauthorized', async () => {
        checkAuth.mockImplementation((req, res, next) => res.status(401).send('Access denied'))
        updateBlogById.mockResolvedValue({
            userId: 1,
            title: 'title',
            content: 'content',
            blogPrvText: 'blogPrvText',
            blogImgSrc: 'blogImgSrc'
        })

        const response = await request(app)
            .put('/api/blogs/1')
            .send({
                userId: 1,
                title: 'title',
                content: 'content',
                blogPrvText: 'blogPrvText',
                blogImgSrc: 'blogImgSrc'
            })

        expect(response.status).toBe(401)
        expect(response.text).toBe('Access denied')
    })

    it('should return 400 if input fields are empty', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        updateBlogById.mockResolvedValue({
            userId: 1,
            title: '',
            content: '',
            blogPrvText: '',
            blogImgSrc: '',
            blogId: 1
        })

        const response = await request(app)
            .put('/api/blogs/1')
            .send({
                userId: 1,
                title: '',
                content: '',
                blogPrvText: '',
                blogImgSrc: '',
                blogId: 1
            })

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Data not valid')
    })

    it('should return server error 500', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        updateBlogById.mockRejectedValue(new Error('DB Error'))

        const response = await request(app)
            .put('/api/blogs/1')
            .send({
                userId: 1,
                title: 'title',
                content: 'content',
                blogPrvText: 'blogPrvText',
                blogImgSrc: 'blogImgSrc'
            })


        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal server error')
    })
})


// Delete Blog by id
describe('DELETE /api/blogs/:id', () => {
    it('should delete blog and return status 200', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        deleteBlogById.mockResolvedValue([{ blog_id: 1 }])

        const response = await request(app)
            .delete('/api/blogs/1')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([{ blog_id: 1 }])
    })

    it('should return 401 if user is unauthorized', async () => {
        checkAuth.mockImplementation((req, res, next) => res.status(401).send('Access denied'))

        const response = await request(app)
            .delete('/api/blogs/1')

        expect(response.status).toBe(401)
        expect(response.text).toBe('Access denied')
    })

    it('should return 404 if blog not found', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        deleteBlogById.mockResolvedValue([])

        const response = await request(app)
            .delete('/api/blogs/1')

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Blog not found')
    })

    it('should return server error 500', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        deleteBlogById.mockRejectedValue(new Error('DB Error'))

        const response = await request(app)
            .delete('/api/blogs/1')

        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Internal server error')
    })
})