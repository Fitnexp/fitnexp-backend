import dotenv from 'dotenv';
import UserService from '../user/userService';
import ExerciseService from '../exercise/exerciseService';
import WorkoutService from '../workout/workoutService';
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

        it('should have populated the database with workouts', async () => {
            const workouts = await WorkoutService.getWorkouts('Alberto');
            expect(workouts.length).toBe(2);
        });

        it('should have populated the database with completed exercises', async () => {
            const exercises = await ExerciseService.getLatestCompletedExercise(
                'Alberto',
                'Ab Roller',
            );
            expect(exercises.length).toBe(1);
        });
    });
}

export default populateTests;
