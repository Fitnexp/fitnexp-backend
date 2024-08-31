import { Express } from 'express';
import { logUser, retrieveData } from '../utils/testsUtils';
import WorkoutService from './workoutService';
import workouts from '../populate/data/workouts';
import supertest from 'supertest';
import IWorkout from './workoutInterface';
import exercises from '../populate/data/exercises';

function workoutTests(app: Express) {
    describe('Workout', () => {
        let cookie = '';

        beforeAll(async () => {
            cookie = await logUser(app);
        });

        describe('when the user retrieves all workouts', () => {
            it('should return all workouts related to that user', async () => {
                const response = await retrieveData(
                    app,
                    cookie,
                    '/api/workouts',
                );
                expect(response.body.workouts.length).toBe(2);
            });
        });

        describe('when the user retrieves a workout by its name', () => {
            describe('if the workout does not exist', () => {
                it('should return a 400 status code', async () => {
                    const workout = await WorkoutService.getWorkoutByName(
                        'this certainly',
                        'does not exist',
                    );
                    expect(
                        (workout as { errors: string }).errors,
                    ).toBeDefined();
                });
            });
            describe('if a user is trying to retrieve data from a workout that does not belong to them', () => {
                it('should return a 400 status code', async () => {
                    const workout = await WorkoutService.getWorkoutByName(
                        'Jane Doe',
                        'does not exist',
                    );
                    expect(
                        (workout as { errors: string }).errors,
                    ).toBeDefined();
                });
            });
        });

        describe('when the user retrieves the latest completed exercises from a workout', () => {
            describe('if the workout id is not valid', () => {
                it('should return a 400 status code', async () => {
                    const workout_id = 'invalid_id';
                    const response = await retrieveData(
                        app,
                        cookie,
                        `/api/workouts/${workout_id}`,
                        400,
                    );
                    expect(response.status).toBe(400);
                });
            });
            describe('if the workout id is valid but there is not a workout with that id', () => {
                it('should return a 400 status code', async () => {
                    const workout_id = '66c7176834f84624a80d1b02';
                    const response = await retrieveData(
                        app,
                        cookie,
                        `/api/workouts/${workout_id}`,
                        400,
                    );
                    expect(response.status).toBe(400);
                });
            });
            describe('if a user is trying to retrieve data from a workout that does not belong to them', () => {
                it('should return a 400 status code', async () => {
                    const workout = await WorkoutService.getWorkoutByName(
                        workouts[2].username,
                        workouts[2].name,
                    );

                    const response = await retrieveData(
                        app,
                        cookie,
                        `/api/workouts/${(workout as { _id: string })._id}`,
                        400,
                    );
                    expect(response.status).toBe(400);
                });
            });
            describe('if all the data is valid', () => {
                it('should return a 200 status code', async () => {
                    const workout = await WorkoutService.getWorkoutByName(
                        workouts[0].username,
                        workouts[0].name,
                    );

                    const response = await retrieveData(
                        app,
                        cookie,
                        `/api/workouts/${(workout as { _id: string })._id}`,
                        200,
                    );
                    expect(response.status).toBe(200);
                });
            });
        });

        describe('when the user deletes an exercise from a workout', () => {
            describe("if the workout id is not valid'", () => {
                it('should return a 400 status code', async () => {
                    const workout_id = 'invalid_id';
                    const response = await supertest
                        .agent(app)
                        .delete(`/api/workouts/${workout_id}/exercises/0`)
                        .set('Cookie', cookie)
                        .send();

                    expect(response.status).toBe(400);
                    return response;
                });
            });

            describe('if the workout id is valid but the position is not valid', () => {
                it('should return a 400 status code', async () => {
                    const workout = (await WorkoutService.getWorkoutByName(
                        workouts[0].username,
                        workouts[0].name,
                    )) as { _id: string };

                    const response = await supertest
                        .agent(app)
                        .delete(`/api/workouts/${workout._id}/exercises/100`)
                        .set('Cookie', cookie)
                        .send();

                    expect(response.status).toBe(400);
                    return response;
                });
            });

            describe("if the data is valid'", () => {
                it('should return a 200 status code', async () => {
                    const workout = (await WorkoutService.getWorkoutByName(
                        workouts[0].username,
                        workouts[0].name,
                    )) as unknown as IWorkout & { _id: string };

                    const numberExercises = workout.exercises.length;

                    const response = await supertest
                        .agent(app)
                        .delete(`/api/workouts/${workout._id}/exercises/0`)
                        .set('Cookie', cookie)
                        .send();

                    expect(response.status).toBe(200);

                    const updatedWorkout = await WorkoutService.getWorkout(
                        workout.username,
                        workout._id,
                    );

                    expect((updatedWorkout as IWorkout).exercises.length).toBe(
                        numberExercises - 1,
                    );

                    return response;
                });
            });
        });

        describe('when the user adds an exercise to a workout', () => {
            describe("if the workout id is not valid'", () => {
                it('should return a 400 status code', async () => {
                    const workout_id = 'invalid_id';
                    const response = await supertest
                        .agent(app)
                        .post(`/api/workouts/${workout_id}/exercises`)
                        .set('Cookie', cookie)
                        .send(exercises[0]);

                    expect(response.status).toBe(400);
                    return response;
                });
            });

            describe("if the data is valid'", () => {
                it('should return a 200 status code', async () => {
                    const workout = (await WorkoutService.getWorkoutByName(
                        workouts[0].username,
                        workouts[0].name,
                    )) as unknown as IWorkout & { _id: string };

                    const numberExercises = workout.exercises.length;

                    const response = await supertest
                        .agent(app)
                        .post(`/api/workouts/${workout._id}/exercises`)
                        .set('Cookie', cookie)
                        .send(exercises[0]);

                    expect(response.status).toBe(200);

                    const updatedWorkout = await WorkoutService.getWorkout(
                        workout.username,
                        workout._id,
                    );

                    expect((updatedWorkout as IWorkout).exercises.length).toBe(
                        numberExercises + 1,
                    );

                    return response;
                });
            });
        });

        describe('when the user adds an exercise to a workout', () => {
            describe("if the workout id is not valid'", () => {
                it('should return a 400 status code', async () => {
                    const workout_id = 'invalid_id';
                    const response = await supertest
                        .agent(app)
                        .post(`/api/workouts/${workout_id}/exercises`)
                        .set('Cookie', cookie)
                        .send(exercises[0]);

                    expect(response.status).toBe(400);
                    return response;
                });
            });

            describe("if the data is valid'", () => {
                it('should return a 200 status code', async () => {
                    const workout = (await WorkoutService.getWorkoutByName(
                        workouts[0].username,
                        workouts[0].name,
                    )) as unknown as IWorkout & { _id: string };

                    const numberExercises = workout.exercises.length;

                    const response = await supertest
                        .agent(app)
                        .post(`/api/workouts/${workout._id}/exercises`)
                        .set('Cookie', cookie)
                        .send(exercises[0]);

                    expect(response.status).toBe(200);

                    const updatedWorkout = await WorkoutService.getWorkout(
                        workout.username,
                        workout._id,
                    );

                    expect((updatedWorkout as IWorkout).exercises.length).toBe(
                        numberExercises + 1,
                    );

                    return response;
                });
            });
        });

        describe('when the user adds a new workout', () => {
            const workout = {
                name: 'New Workout',
                description: 'This is a new workout',
            };

            const tests = [
                {
                    description: 'if the workout name is empty',
                    status: 400,
                    data: { ...workout, name: '' },
                },
                {
                    description: 'if the workout name is not a string',
                    status: 400,
                    data: { ...workout, name: 12 },
                },
                {
                    description: 'if the workout description is not a string',
                    status: 400,
                    data: { ...workout, description: 12 },
                },
                {
                    description: "if the data is valid'",
                    status: 200,
                    data: workout,
                },
            ];

            tests.forEach((test) => {
                describe(test.description, () => {
                    it(`should return a ${test.status} status code`, async () => {
                        const response = await supertest
                            .agent(app)
                            .post(`/api/workouts`)
                            .set('Cookie', cookie)
                            .send(test.data);

                        expect(response.status).toBe(test.status);
                        return response;
                    });
                });
            });
        });
    });
}
export default workoutTests;
