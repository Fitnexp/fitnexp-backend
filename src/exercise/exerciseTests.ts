import { Express } from 'express';
import { logUser, retrieveData } from '../utils/testsUtils';

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
    });
}
export default exerciseTests;
