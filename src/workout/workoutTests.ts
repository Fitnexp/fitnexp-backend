import { Express } from 'express';
import { logUser, retrieveData } from '../utils/testsUtils';

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
    });
}
export default workoutTests;
