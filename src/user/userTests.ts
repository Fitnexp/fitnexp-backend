import supertest from 'supertest';
import { Express } from 'express';

function userTests(app: Express) {
    describe('User', () => {
        let user: object;

        const registerUser = async (status: number, overrides = {}) => {
            const userData = { ...user, ...overrides };
            const response = await supertest(app)
                .post('/api/register')
                .send(userData)
                .expect(status);

            return response;
        };

        const loginUser = async (status: number, overrides = {}) => {
            const userData = { ...user, ...overrides };
            const response = await supertest(app)
                .post('/api/login')
                .send(userData)
                .expect(status);

            return response;
        };

        const logoutUser = async (status: number) => {
            const response = await supertest(app)
                .post('/api/logout')
                .expect(status);

            return response;
        };

        const loggedUserRoute = async (status: number, logUser = false) => {
            let cookie = '';
            if (logUser) {
                const logUserresponse = await loginUser(200, {
                    email: 'alberto@gmail.com',
                    password: 'passwordpassword', // NOSONAR
                });

                cookie = logUserresponse.headers['set-cookie'];
            }
            const response = await supertest
                .agent(app)
                .get('/api/loggedUser')
                .set('Cookie', cookie)
                .send()
                .expect(status);

            return response;
        };

        beforeEach(() => {
            user = {
                email: 'test1@gmail.com',
                password: 'testtesttesttesttest123', // NOSONAR
                username: 'test123',
                confirmPassword: 'testtesttesttesttest123', // NOSONAR
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
                    return await registerUser(400, { password: '' }); // NOSONAR
                });
            });
            describe('when the password is not a string', () => {
                it('should return status 400', async () => {
                    return await registerUser(400, { password: 123 }); // NOSONAR
                });
            });
            describe('when the password is shorter than 12 characters', () => {
                it('should return status 400', async () => {
                    return await registerUser(400, {
                        password: '31324061203',
                    }); // NOSONAR
                });
            });
            describe('when the password is longer than 32 characters', () => {
                it('should return status 400', async () => {
                    return await registerUser(400, {
                        password: '701063091103467232677870762852102',
                    }); // NOSONAR
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
            describe('when the username is longer than 16 characters', () => {
                it('should return status 400', async () => {
                    return await registerUser(400, {
                        username: '70984760012761231',
                    });
                });
            });
            describe('when the confirmPassword is blank', () => {
                it('should return status 400', async () => {
                    return await registerUser(400, {
                        confirmPassword: '',
                    }); // NOSONAR
                });
            });
            describe('when the confirmPassword is not a string', () => {
                it('should return status 400', async () => {
                    return await registerUser(400, {
                        confirmPassword: 123,
                    }); // NOSONAR
                });
            });
            describe('when the password and confirmPassword do not match', () => {
                it('should return status 400', async () => {
                    return await registerUser(400, {
                        confirmPassword: 'test1234',
                    }); // NOSONAR
                });
            });
            describe('when the email is already in use', () => {
                it('should return status 400', async () => {
                    return await registerUser(400, {
                        email: 'alberto@gmail.com',
                    });
                });
            });
            describe('when the username is already in use', () => {
                it('should return status 400', async () => {
                    return await registerUser(400, {
                        username: 'Alberto',
                    });
                });
            });
            describe('when the user is valid', () => {
                it('should return status 200', async () => {
                    return await registerUser(200);
                });
            });
        });

        describe('login an user', () => {
            describe('when the email is blank', () => {
                it('should return status 400', async () => {
                    return await loginUser(400, { email: '' });
                });
            });
            describe('when the email is not a string', () => {
                it('should return status 400', async () => {
                    return await loginUser(400, { email: 123 });
                });
            });
            describe('when the password is blank', () => {
                it('should return status 400', async () => {
                    return await loginUser(400, { password: '' }); // NOSONAR
                });
            });
            describe('when the password is not a string', () => {
                it('should return status 400', async () => {
                    return await loginUser(400, { password: 123 }); // NOSONAR
                });
            });
            describe('when the password is shorter than 12 characters', () => {
                it('should return status 400', async () => {
                    return await loginUser(400, {
                        password: '31324061203',
                    }); // NOSONAR
                });
            });
            describe('when the password is longer than 32 characters', () => {
                it('should return status 400', async () => {
                    return await registerUser(400, {
                        password: '701063091103467232677870762852102',
                    }); // NOSONAR
                });
            });
            describe('when the email is incorrect', () => {
                it('should return status 400', async () => {
                    return await loginUser(400, {
                        email: 'thisdoesnotexist@gmail.com',
                        password: '3132406120331324061203',
                    }); // NOSONAR
                });
            });
            describe('when the password is incorrect', () => {
                it('should return status 400', async () => {
                    return await loginUser(400, {
                        email: 'alberto@gmail.com',
                        password: 'randompassword',
                    }); // NOSONAR
                });
            });
            describe('when the credentials are correct', () => {
                it('should return status 200', async () => {
                    const response = await loginUser(200, {
                        email: 'alberto@gmail.com',
                        password: 'passwordpassword',
                    }); // NOSONAR
                    expect(response.headers['set-cookie']).toBeDefined();
                    expect(response.headers['set-cookie'][0]).toContain(
                        'accessToken',
                    );
                    expect(response.headers['set-cookie'][1]).toContain(
                        'refreshToken',
                    );
                });
            });
        });

        describe('log out an user', () => {
            describe('when anyone logs out', () => {
                it('should return status 200', async () => {
                    const response = await logoutUser(200);
                    expect(response.headers['set-cookie']).toBeDefined();
                    expect(response.headers['set-cookie'][0]).toContain(
                        'accessToken=; ',
                    );
                    expect(response.headers['set-cookie'][1]).toContain(
                        'refreshToken=; ',
                    );
                });
            });
        });

        describe('logged user route', () => {
            describe('when a logged out user accesses logged user route', () => {
                it('should return status 400', async () => {
                    return await loggedUserRoute(400);
                });
            });
            describe('when a logged in user accesses logged user route', () => {
                it('should return status 200', async () => {
                    return await loggedUserRoute(200, true);
                });
            });
        });
    });
}

export default userTests;
