import './App.css';
import { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import initalData from './exercise_data';
import ExerciseList from './components/ExerciseList';

function App() {
  const [state, setState] = useState(initalData);

  const [seconds, setSeconds] = useState(10);
  const [workout, setWorkout] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("Start");

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if (buttonMessage === "Reset") {
        if (seconds === 0) {
          if (workout) {
            setSeconds(10);
            setWorkout(false);
          } else {
            setSeconds(20);
            setWorkout(true);
          }
        } else {
          setSeconds(seconds - 1)
        }
      } else {
        setSeconds(10);
      }
    }, 1000);
  }, [seconds, workout, buttonMessage])

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
    <div className="App">
      <div className="tabataTimer">
        <div className="timer">{seconds}</div>
        <button className="startButton" onClick={toggleTimer}>{buttonMessage}</button>
      </div>
      <div className='exercisesContainer'>
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
