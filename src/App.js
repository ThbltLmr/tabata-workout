import logo from './logo.svg';
import './App.css';
import { clear } from "@testing-library/user-event/dist/clear";
import { useState, useEffect } from "react";
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';

function App() {
  const exercises = [
    {
      name: 'squats',
      thumbnail: './thumbnails/squats.png'
    },
    {
      name: 'push-ups',
      thumbnail: './thumbnails/pushups.png'
    }
  ]
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

  return (
    <div className="App">
      <div className="tabataTimer">
        <div className="timer">{seconds}</div>
        <button className="startButton" onClick={toggleTimer}>{buttonMessage}</button>
      </div>
      <div className='exercisesContainer'>
        Drag exercises from the list below to build your workout
        <ul className="exercisesList">
          {exercises.map(({name, thumbnail}) => {
            return (
              <li key={name}>
                  <div className="characters-thumb">
                    <img src={thumbnail} alt={`${name} Thumb`} />
                  </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
