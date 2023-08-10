const initalData = {
  exercises: {
    'exercise-1': { id: 'exercise-1', name: 'Squats', thumbnail: './thumbnails/squats.png' },
    'exercise-2': { id: 'exercise-2', name: 'Push-ups', thumbnail: './thumbnails/pushups.png' },
    'exercise-3': { id: 'exercise-3', name: 'Jumping jacks', thumbnail: './thumbnails/jumpingJacks.png' },
    'exercise-4': { id: 'exercise-4', name: 'Crunches', thumbnail: './thumbnails/crunches.png' },
    'exercise-5': { id: 'exercise-5', name: 'Burpees', thumbnail: './thumbnails/burpees.png' },
    'exercise-6': { id: 'exercise-6', name: 'Plank', thumbnail: './thumbnails/plank.png' }
  },
  lists: {
    availableExercises: {
      id: 'availableExercises',
      exerciseIds: ['exercise-1', 'exercise-2', 'exercise-3', 'exercise-4', 'exercise-5', 'exercise-6'],
      message: "Drag exercises to the workout area to build your workout."
    },
    workout: {
      id: 'workout',
      exerciseIds: [],
      message: "Drag exercises here to build your workout."
    }
  },
  listOrder: ['workout', 'availableExercises']
}

export default initalData
