const initalData = {
  exercises: {
    'exercise-1': { id: 'exercise-1', name: 'Squats', thumbnail: './thumbnails/squats.png' },
    'exercise-2': { id: 'exercise-2', name: 'Push-ups', thumbnail: './thumbnails/pushups.png' },
  },
  lists: {
    availableExercises: {
      id: 'availableExercises',
      exerciseIds: ['exercise-1', 'exercise-2'],
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
