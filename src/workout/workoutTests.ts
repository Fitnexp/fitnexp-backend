import supertest from 'supertest';
import { Express } from 'express';

function workoutTests(app: Express) {
    describe('Workout', () => {
        let cookie = '';

        beforeAll(async () => {
            const responseLogUser = await supertest(app)
                .post('/api/login')
                .send({
                    email: 'alberto@gmail.com',
                    password: 'passwordpassword', // NOSONAR,
                })
                .expect(200);

            cookie = responseLogUser.headers['set-cookie'];
        });

        describe('when the user retrieves all workouts', () => {
            it('should return all workouts related to that user', async () => {
                const response = await supertest
                    .agent(app)
                    .get('/api/workouts')
                    .set('Cookie', cookie)
                    .send();

                expect(response.status).toBe(200);
                expect(response.body.workouts.length).toBe(2);
            });
        });
    });
}
export default workoutTests;
