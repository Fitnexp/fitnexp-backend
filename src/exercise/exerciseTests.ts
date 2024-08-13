import supertest from 'supertest';
import { Express } from 'express';

function exerciseTests(app: Express) {
    describe('Exercise', () => {
        let cookie = '';

        beforeAll(async () => {
            const responseLogUser = await supertest(app)
                .post('/api/login')
                .send({
                    email: 'alberto@gmail.com',
                    password: 'passwordpassword',
                })
                .expect(200);

            cookie = responseLogUser.headers['set-cookie'];
        });

        describe('when the user retrieves all exercises', () => {
            it('should return all exercises', async () => {
                const response = await supertest
                    .agent(app)
                    .get('/api/exercises')
                    .set('Cookie', cookie)
                    .send();

                expect(response.status).toBe(200);
                expect(response.body.exercises.length).toBe(873);
            });
        });
    });
}
export default exerciseTests;
