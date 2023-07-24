import { clear } from "@testing-library/user-event/dist/clear";
import { useState, useEffect } from "react";

export default function TabataTimer() {
  const [seconds, setSeconds] = useState(10);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [workout, setWorkout] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if (seconds === 0) {
        if (workout) {
          setSeconds(10);
          setWorkout(false);
        } else {
          setSeconds(20);
          setWorkout(true);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds, workout])

  return (
    <div className="TabataTimer">
      {displayMessage && <div className="message">Add exercises and press Start you fat fuck</div>}
      <div className="timer">
        {seconds}
      </div>
    </div>
  );
}
