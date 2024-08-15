import dotenv from 'dotenv';
import UserService from '../user/userService';
import ExerciseService from '../exercise/exerciseService';
dotenv.config();

function populateTests() {
    describe('Populate', () => {
        it('should have populated the database with users', async () => {
            const users = await UserService.getUsers();
            expect(users.length).toBe(2);
        });

        it('should have populated the database with exercise', async () => {
            const exercises = await ExerciseService.getExercises();
            expect(exercises.length).toBe(873);
        });
    });
}

export default populateTests;
