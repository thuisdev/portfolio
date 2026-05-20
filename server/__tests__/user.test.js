const request = require('supertest')
const app = require('../app')

// Mocking
jest.mock('../db/userQueries')
jest.mock('../middleware/auth-middleware')

const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../db/userQueries')
const { checkAuth } = require('../middleware/auth-middleware')

const mockUser = {
    user_id: 1,
    username: 'testuser',
    name: 'Test',
    email: 'test@test.com',
    role: 'user'
}

// Get all Users
describe('GET /api/users', () => {
    it('should return all users and status 200', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        getAllUsers.mockResolvedValue([mockUser])

        const response = await request(app).get('/api/users')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([mockUser])
    })

    it('should return empty array and status 200', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        getAllUsers.mockResolvedValue([])

        const response = await request(app).get('/api/users')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })

    it('should return 401 if unauthorized', async () => {
        checkAuth.mockImplementation((req, res, next) => res.status(401).send('Access denied'))

        const response = await request(app).get('/api/users')

        expect(response.status).toBe(401)
        expect(response.text).toBe('Access denied')
    })

    it('should return 500 on server error', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        getAllUsers.mockRejectedValue(new Error('DB Error'))

        const response = await request(app).get('/api/users')

        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Internal server error')
    })
})

// Get User by id
describe('GET /api/users/:id', () => {
    it('should return user by id and status 200', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        getUserById.mockResolvedValue([mockUser])

        const response = await request(app).get('/api/users/1')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([mockUser])
    })

    it('should return 404 if user not found', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        getUserById.mockResolvedValue([])

        const response = await request(app).get('/api/users/1')

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('User not found')
    })

    it('should return 500 on server error', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        getUserById.mockRejectedValue(new Error('DB Error'))

        const response = await request(app).get('/api/users/1')

        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Internal server error')
    })
})

// Create User
describe('POST /api/users', () => {
    it('should create user and return status 200', async () => {
        createUser.mockResolvedValue(mockUser)

        const response = await request(app)
            .post('/api/users')
            .send({ username: 'testuser', name: 'Test', email: 'test@test.com', role: 'user' })

        expect(response.status).toBe(200)
        expect(response.body.username).toBe('testuser')
    })

    it('should return 400 if fields are empty', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ username: '', name: '', email: '' })

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Data not valid')
    })

    it('should return 500 on server error', async () => {
        createUser.mockRejectedValue(new Error('DB Error'))

        const response = await request(app)
            .post('/api/users')
            .send({ username: 'testuser', name: 'Test', email: 'test@test.com' })

        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Internal server error')
    })
})

// Update User by id
describe('PUT /api/users/:id', () => {
    it('should update user and return status 200', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        updateUserById.mockResolvedValue(mockUser)

        const response = await request(app)
            .put('/api/users/1')
            .send({ name: 'Test', email: 'test@test.com' })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe('Test')
    })

    it('should return 401 if unauthorized', async () => {
        checkAuth.mockImplementation((req, res, next) => res.status(401).send('Access denied'))

        const response = await request(app)
            .put('/api/users/1')
            .send({ name: 'Test', email: 'test@test.com' })

        expect(response.status).toBe(401)
        expect(response.text).toBe('Access denied')
    })

    it('should return 400 if fields are empty', async () => {
        checkAuth.mockImplementation((req, res, next) => next())

        const response = await request(app)
            .put('/api/users/1')
            .send({ name: '', email: '' })

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Data not valid')
    })

    it('should return 500 on server error', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        updateUserById.mockRejectedValue(new Error('DB Error'))

        const response = await request(app)
            .put('/api/users/1')
            .send({ name: 'Test', email: 'test@test.com' })

        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Internal server error')
    })
})

// Delete User by id
describe('DELETE /api/users/:id', () => {
    it('should delete user and return status 200', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        deleteUserById.mockResolvedValue([{ user_id: 1 }])

        const response = await request(app).delete('/api/users/1')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([{ user_id: 1 }])
    })

    it('should return 401 if unauthorized', async () => {
        checkAuth.mockImplementation((req, res, next) => res.status(401).send('Access denied'))

        const response = await request(app).delete('/api/users/1')

        expect(response.status).toBe(401)
        expect(response.text).toBe('Access denied')
    })

    it('should return 404 if user not found', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        deleteUserById.mockResolvedValue([])

        const response = await request(app).delete('/api/users/1')

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('User not found')
    })

    it('should return 500 on server error', async () => {
        checkAuth.mockImplementation((req, res, next) => next())
        deleteUserById.mockRejectedValue(new Error('DB Error'))

        const response = await request(app).delete('/api/users/1')

        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Internal server error')
    })
})