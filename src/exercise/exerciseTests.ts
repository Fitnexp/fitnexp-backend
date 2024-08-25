import { Express } from 'express';
import { logUser, retrieveData } from '../utils/testsUtils';
import supertest from 'supertest';

function exerciseTests(app: Express) {
    describe('Exercise', () => {
        let cookie = '';

        beforeAll(async () => {
            cookie = await logUser(app);
        });

        describe('when the user retrieves all exercises', () => {
            it('should return all exercises', async () => {
                const response = await retrieveData(
                    app,
                    cookie,
                    '/api/exercises',
                );
                expect(response.body.exercises.length).toBe(873);
            });
        });

        describe('post a complete exercise', () => {
            let completedExercise: object;

            const postCompletedExercise = async (
                status: number,
                overrides = {},
            ) => {
                const completedExerciseData = {
                    ...completedExercise,
                    ...overrides,
                };
                const response = await supertest
                    .agent(app)
                    .post('/api/exercises/completed-exercise')
                    .set('Cookie', cookie)
                    .send(completedExerciseData);

                expect(response.status).toBe(status);
                console.log(response.body);
                return response;
            };

            beforeEach(() => {
                completedExercise = {
                    exercise_name: 'Ab Roller',
                    username: 'Alberto',
                    rest: 60,
                    sets: [
                        { repetitions: 10, weight: 10 },
                        { repetitions: 10, weight: 10 },
                        { repetitions: 10, weight: 10 },
                        { repetitions: 10, weight: 10 },
                    ],
                };
            });
            const testScenarios = [
                {
                    description: 'when there is not an username',
                    statusCode: 400,
                    payload: { username: undefined },
                },
                {
                    description: 'when the username is not a string',
                    statusCode: 400,
                    payload: { username: 1231 },
                },
                {
                    description:
                        "when the username doesn't match the logged user",
                    statusCode: 400,
                    payload: { username: 'John' },
                },
                {
                    description: 'when there is not an exercise name',
                    statusCode: 400,
                    payload: { exercise_name: undefined },
                },
                {
                    description: 'when the exercise name is not a string',
                    statusCode: 400,
                    payload: { exercise_name: 1231 },
                },
                {
                    description: 'when there is not rest',
                    statusCode: 400,
                    payload: { rest: 0 },
                },
                {
                    description: 'when rest is not a number',
                    statusCode: 400,
                    payload: { rest: '1231' },
                },
                {
                    description: 'when rest value is negative',
                    statusCode: 400,
                    payload: { rest: -20 },
                },
                {
                    description: 'when there is not sets',
                    statusCode: 400,
                    payload: { sets: '' },
                },
                {
                    description: 'when sets is no a list',
                    statusCode: 400,
                    payload: { sets: '20' },
                },
                {
                    description: 'when the sets list has not got any sets',
                    statusCode: 400,
                    payload: { sets: [] },
                },
                {
                    description: "when the sets list doesn't have repetitions",
                    statusCode: 400,
                    payload: { sets: [{ weight: 10 }] },
                },
                {
                    description: "when the sets list doesn't have weight",
                    statusCode: 400,
                    payload: { sets: [{ repetitions: 10 }] },
                },
                {
                    description:
                        'when the sets list has repetitions which are not numbers',
                    statusCode: 400,
                    payload: { sets: [{ repetitions: '10', weight: 10 }] },
                },
                {
                    description:
                        'when the sets list has repetitions which are negative',
                    statusCode: 400,
                    payload: { sets: [{ repetitions: -10, weight: 10 }] },
                },
                {
                    description:
                        'when the sets list has weight which are not numbers',
                    statusCode: 400,
                    payload: { sets: [{ repetitions: 10, weight: '10' }] },
                },
                {
                    description:
                        'when the sets list has weight which are negative',
                    statusCode: 400,
                    payload: { sets: [{ repetitions: 10, weight: -10 }] },
                },
                {
                    description: 'when everything is correct',
                    statusCode: 200,
                    payload: {},
                },
            ];

            describe('postCompletedExercise', () => {
                testScenarios.forEach(
                    ({ description, statusCode, payload }) => {
                        describe(description, () => {
                            it(`should return a ${statusCode} status code`, async () => {
                                await postCompletedExercise(
                                    statusCode,
                                    payload,
                                );
                            });
                        });
                    },
                );
            });
        });
    });
}
export default exerciseTests;
