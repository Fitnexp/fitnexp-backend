import supertest from 'supertest';
import createServer from '../server';
import mongoose from 'mongoose';
import config from '../../config';

const app = createServer();

describe('User', () => {
    let user: object;

    const registerUser = async (status: number, overrides = {}) => {
        const userData = { ...user, ...overrides };
        return await supertest(app)
            .post('/api/register')
            .send(userData)
            .expect(status)
            .then((res) => console.log(res.body));
    };

    beforeAll(async () => {
        await mongoose.connect(config.MONGODB_URI).catch(() => {
            throw new Error('Failed to connect to the database');
        });

        await supertest(app).post('/api/register').send({
            email: 'test@gmail.com',
            password: 'test',
            username: 'test',
            confirmPassword: 'test',
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    beforeEach(() => {
        user = {
            email: 'test1@gmail.com',
            password: 'test123',
            username: 'test123',
            confirmPassword: 'test123',
        };
    });

    describe('register an user', () => {
        describe('when the email is blank', () => {
            it('should return status 400', async () => {
                return await registerUser(400, { email: '' });
            });
        });
        describe('when the email is not a string', () => {
            it('should return status 400', async () => {
                return await registerUser(400, { email: 123 });
            });
        });
        describe('when the password is blank', () => {
            it('should return status 400', async () => {
                return await registerUser(400, { password: '' });
            });
        });
        describe('when the password is not a string', () => {
            it('should return status 400', async () => {
                return await registerUser(400, { password: 123 });
            });
        });
        describe('when the username is blank', () => {
            it('should return status 400', async () => {
                return await registerUser(400, { username: '' });
            });
        });
        describe('when the username is not a string', () => {
            it('should return status 400', async () => {
                return await registerUser(400, { username: 123 });
            });
        });
        describe('when the confirmPassword is blank', () => {
            it('should return status 400', async () => {
                return await registerUser(400, {
                    confirmPassword: '',
                });
            });
        });
        describe('when the confirmPassword is not a string', () => {
            it('should return status 400', async () => {
                return await registerUser(400, {
                    confirmPassword: 123,
                });
            });
        });
        describe('when the password and confirmPassword do not match', () => {
            it('should return status 400', async () => {
                return await registerUser(400, {
                    confirmPassword: 'test1234',
                });
            });
        });
        describe('when the email is already in use', () => {
            it('should return status 400', async () => {
                return await registerUser(400, {
                    email: 'test@gmail.com',
                });
            });
        });
        describe('when the username is already in use', () => {
            it('should return status 400', async () => {
                return await registerUser(400, {
                    username: 'test',
                });
            });
        });
        describe('when the user is valid', () => {
            it('should return status 200', async () => {
                return await registerUser(200);
            });
        });
    });
});
