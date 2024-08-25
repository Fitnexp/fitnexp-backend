import { Express } from 'express';
import { logUser, retrieveData } from '../utils/testsUtils';
import WorkoutService from './workoutService';
import workouts from '../populate/data/workouts';

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

        describe('when the user retrieves the latests completed exercises from a workout', () => {
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
    });
}
export default workoutTests;
