const request = require('supertest')
const app = require('../app')

// Mocking
jest.mock('../db/userQueries');
jest.mock('../utils/passwordUtils');

const { getUserByUsername, getUserByEmail, createUser } = require('../db/userQueries')
const { comparePassword, hashPassword } = require('../utils/passwordUtils')

// User Login
describe('POST /api/auth/login', () => {
    it('Positive Test: User Login succesfull', async () => {
        getUserByUsername.mockResolvedValue([{
            user_id: 1,
            username: 'username',
            password: 'hashedPassword',
            name: 'name',
            email: 'email',
            role: 'role'

        }])
        comparePassword.mockResolvedValue(true)

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'username',
                password: 'password',
            });

        expect(response.status).toBe(200);
        expect(response.body.user).toEqual({
            user_id: 1,
            username: 'username',
            name: 'name',
            email: 'email',
            role: 'role'
        })
        expect(response.body.token).toBeDefined()
    })

    it('should return 400 if username field is empty', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: '',
                password: 'user123'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Username field is empty')
    })

    it('should return 400 if password field is empty', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Password field is empty')
    })

    it('should return 404 if username is not found', async () => {
        getUserByUsername.mockResolvedValue([])

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'invaliduser',
                password: 'user123'
            });
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('User not found')
    })

    it('should return 401 if password is invalid', async () => {
        comparePassword.mockResolvedValue(false)
        getUserByUsername.mockResolvedValue([
            {
                username: 'testuser',
                password: 'user123'
            }
        ])

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'invalidpassword'
            });
        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Invalid password')
    })
})

// User Create Account
describe('POST /api/auth/create-account', () => {
    it('should return 200 and token on successful registration', async () => {
        getUserByEmail.mockResolvedValue([]);
        getUserByUsername.mockResolvedValue([]);
        hashPassword.mockResolvedValue('hashedPassword');
        createUser.mockResolvedValue([{
            user_id: 1,
            username: 'testuser',
            name: 'Test',
            email: 'test@test.com',
            role: 'user'
        }]);

        const response = await request(app)
            .post('/api/auth/create-account')
            .send({
                username: 'testuser',
                name: 'Test',
                email: 'test@test.com',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.user.username).toBe('testuser');
    });

    it('should return 400 if email format is invalid', async () => {
        const response = await request(app)
            .post('/api/auth/create-account')
            .send({ username: 'testuser', name: 'Test', email: 'notanemail', password: 'password123' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid email format');
    });

    it('should return 400 if password is too short', async () => {
        const response = await request(app)
            .post('/api/auth/create-account')
            .send({ username: 'testuser', name: 'Test', email: 'test@test.com', password: '123' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Password must be at least 6 characters.');
    });

    it('should return 400 if email or username already exists', async () => {
        getUserByEmail.mockResolvedValue([{ email: 'test@test.com' }]);
        getUserByUsername.mockResolvedValue([]);

        const response = await request(app)
            .post('/api/auth/create-account')
            .send({ username: 'testuser', name: 'Test', email: 'test@test.com', password: 'password123' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email or username exists');
    });

    it('should return 400 if fields are empty', async () => {
        const response = await request(app)
            .post('/api/auth/create-account')
            .send({ username: '', name: '', email: '', password: '' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Please fill up input fields');
    });
})