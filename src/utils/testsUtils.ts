import supertest from 'supertest';
import { Express } from 'express';

export async function logUser(app: Express) {
    const responseLogUser = await supertest(app)
        .post('/api/login')
        .send({
            email: 'alberto@gmail.com',
            password: 'passwordpassword', // NOSONAR,
        })
        .expect(200);

    return responseLogUser.headers['set-cookie'];
}

export async function retrieveData(
    app: Express,
    cookie: string,
    endpoint: string,
    status = 200,
) {
    const response = await supertest
        .agent(app)
        .get(endpoint)
        .set('Cookie', cookie)
        .send();

    expect(response.status).toBe(status);
    return response;
}
