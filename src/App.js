import './App.scss';
import { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import initalData from './exercise_data';
import ExerciseList from './components/ExerciseList';

function App() {
  const [state, setState] = useState(initalData);

  const [seconds, setSeconds] = useState(10);
  const [workout, setWorkout] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("Start");
  const [workoutList, setWorkoutList] = useState(state.lists.workout.exerciseIds);
  const [currentExercise, setCurrentExercise] = useState("")

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if (buttonMessage === "Reset") {
        if (seconds === 0) {
          if (workout) {
            setSeconds(10);
            setWorkoutList(state.lists.workout.exerciseIds);
            document.getElementById(currentExercise).firstChild.style.border = "0px solid red";
            setWorkout(false);
          } else {
            setWorkoutList(state.lists.workout.exerciseIds);
            setSeconds(20);
            document.getElementById(currentExercise).firstChild.style.border = "5px solid red";
            setWorkout(true);
          }
        } else if (seconds === 1 && !workout) {
          setWorkoutList(state.lists.workout.exerciseIds);
          currentExercise === "" ? setCurrentExercise(workoutList[0]) : setCurrentExercise(workoutList[workoutList.findIndex((exercise) => exercise === currentExercise) + 1]);
          setSeconds(seconds - 1)
        } else {
          setSeconds(seconds - 1)
        }
      } else {
        setSeconds(10);
      }
    }, 1000);
  }, [seconds, workout, buttonMessage, workoutList, currentExercise, state.lists.workout.exerciseIds])

  const toggleTimer = () => {
    if (buttonMessage === "Start") {
      setButtonMessage("Reset");
    } else {
      setButtonMessage("Start");
      setSeconds(10);
    }
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId=== "availableExercises" &&
       !destination
    ) {
      return;
    }

    else if (source.droppableId === "workout" &&
       !destination
    ) {
      const newWorkoutIds = state.lists[source.droppableId].exerciseIds
      newWorkoutIds.splice(source.index, 1)
      const newState = {
        ...state,
        lists: {
          ...state.lists,
          workout: {
            ...state.lists.workout,
            exerciseIds: newWorkoutIds
          }
        }
      }
      setState(newState);
    }

    else if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    else if (
      destination.droppableId === "availableExercises"
    ) {
      return;
    }

    else if (
      destination.droppableId === "workout" &&
      source.droppableId === "availableExercises") {
        const title = `exercise-${Object.keys(state.exercises).length + 1}`
        const newExercise = {
          id: title,
          name: state.exercises[draggableId].name,
          thumbnail: state.exercises[draggableId].thumbnail
        }
        const newWorkoutIds = state.lists[destination.droppableId].exerciseIds
        newWorkoutIds.splice(destination.index, 0, newExercise.id)
        const newState ={
          ...state,
          exercises: {
            ...state.exercises,
            [newExercise.id]: newExercise
          },
          lists: {
            ...state.lists,
            workout: {
              ...state.lists.workout,
              exerciseIds: newWorkoutIds
            }
          }
        }
      setState(newState);
    }

    else if (
      destination.droppableId === "workout" &&
      source.droppableId === "workout") {
        const newWorkoutIds = state.lists[source.droppableId].exerciseIds
        newWorkoutIds.splice(source.index, 1)
        newWorkoutIds.splice(destination.index, 0, draggableId)
        console.log("check")
        console.log(newWorkoutIds)
        const newState ={
          ...state,
          lists: {
            ...state.lists,
            workout: {
              ...state.lists.workout,
              exerciseIds: newWorkoutIds
            }
          }
        }
      setState(newState);
      }
  }

  return (
    <div className="h-screen text-center flex flex-col rounded">
      <div className="bg-light-gray flex flex-col items-center justify-center mt-12 mb-4 mx-auto w-4/5 p-1 rounded">
        <div className="text-8xl font-semibold">{seconds}</div>
        <button className="text-3xl mb-2" onClick={toggleTimer}>{buttonMessage}</button>
      </div>
      <div className='text-3xl font-bold my-0 mx-auto bg-light-gray rounded w-4/5 p-2'>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.listOrder.map((listId) => {
            const list = state.lists[listId];
            const exercises = list.exerciseIds.map((exerciseId) => state.exercises[exerciseId]);
            return < ExerciseList key={list.id} list={list} exercises={exercises} />
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
