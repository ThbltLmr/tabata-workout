import { clear } from "@testing-library/user-event/dist/clear";
import { useState, useEffect } from "react";

export default function TabataTimer({userWorkout}) {
  const [seconds, setSeconds] = useState(10);
  const [displayMessage, setDisplayMessage] = useState(false);
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
    <div className="tabataTimer">
      {displayMessage && <div className="message">Add exercises and press Start you fat fuck</div>}
      <div className="timer">
        {seconds}
      </div>
      <ul className="exercisesList">
        {userWorkout.map(({name, thumbnail}) => {
          return (
            <li key={name}>
              <div className="characters-thumb">
                <img src={thumbnail} alt={`${name} Thumb`} />
              </div>
            </li>
          );
        })}
      </ul>
      <button className="startButton" onClick={toggleTimer}>{buttonMessage}</button>
    </div>
  );
}
