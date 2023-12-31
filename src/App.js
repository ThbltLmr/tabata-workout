import './App.scss';
import { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import initalData from './exercise_data';
import ExerciseList from './components/ExerciseList';
import Popup from './components/PopUp';
import MouseOverPopover from './components/MouseOverPopover';

function App() {
  const [state, setState] = useState(initalData);
  const [seconds, setSeconds] = useState(10);
  const [workout, setWorkout] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("Start");
  const [workoutList, setWorkoutList] = useState(state.lists.workout.exerciseIds);
  const [currentExercise, setCurrentExercise] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    function startFireworksAnimation() {
      const canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
      canvas.classList.add("fixed", "inset-0", "flex", "items-center", "justify-center", "z-40");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext("2d");

      function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 5;
        this.velocity = {
          x: (Math.random() - 0.5) * 3,
          y: Math.random() * -3,
        };
        this.gravity = 0.1;
        this.opacity = 1;
      }

      Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      };

      Particle.prototype.update = function () {
        this.draw();
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.opacity -= 0.01;
      };

      const particles = [];

      function createParticles(x, y, color) {
        for (let i = 0; i < 100; i++) {
          particles.push(new Particle(x, y, color));
        }
      }

      function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
          if (particle.opacity <= 0) {
            particles.splice(index, 1);
          } else {
            particle.update();
          }
        });
      }

      const colors = ["#FF5733", "#FFC300", "#36D7B7", "#900C3F", "#3498DB"];
      for (let i = 0; i < 10; i++) {
        createParticles(Math.random() * canvas.width, Math.random() * canvas.height, colors[Math.floor(Math.random() * colors.length)]);
      }
      animate();
      setTimeout(() => {
        canvas.remove();
      }, 800);
    }

    let interval = setInterval(() => {
      // const circle = document.querySelector(".circle");
      // const svg = document.querySelector(".svg");
      clearInterval(interval);
      if (buttonMessage === "Reset") {
        if (seconds === 0) {
          if (currentExercise === workoutList[workoutList.length - 1] && workout) {
            clearInterval(interval);
            setSeconds(10);
            // circle.classList.remove("animate-10", "animate-20");
            setButtonMessage("Start");
            setWorkoutList(state.lists.workout.exerciseIds);
            document.getElementById(currentExercise).firstChild.style.border = "0px solid black";
            setCurrentExercise("");
            setWorkout(false);
            setIsOpen(true);
            startFireworksAnimation();
          } else if (workout) {
            // circle.classList.remove("animate-20");
            // const newCircle = circle.cloneNode(true);
            // circle.remove();
            setSeconds(10);
            // svg.appendChild(newCircle);
            // newCircle.classList.add("animate-10");
            setWorkoutList(state.lists.workout.exerciseIds);
            document.getElementById(currentExercise).firstChild.style.border = "0px solid black";
            setWorkout(false);
          } else {
            // circle.classList.remove("animate-10");
            // const newCircle = circle.cloneNode(true);
            // circle.remove();
            setWorkoutList(state.lists.workout.exerciseIds);
            setSeconds(20);
            // svg.appendChild(newCircle);
            // newCircle.classList.add("animate-20");
            document.getElementById(currentExercise).firstChild.style.border = "5px solid black";
            setWorkout(true);
          }
        } else if (seconds === 1 && !workout) {
          setWorkoutList(state.lists.workout.exerciseIds);
          currentExercise === "" ? setCurrentExercise(workoutList[0]) : setCurrentExercise(workoutList[workoutList.findIndex((exercise) => exercise === currentExercise) + 1]);
          setSeconds(seconds - 1)
        } else {
          setSeconds(seconds - 1)
          // circle.classList.add("animate-10");
        }
      } else {
        setSeconds(10);
        // circle.classList.remove("animate-10", "animate-20");
      }
    }, 1000);
  }, [seconds, workout, isOpen, buttonMessage, workoutList, currentExercise, state.lists.workout.exerciseIds])

  const toggleTimer = () => {
    const circle = document.querySelector(".circle");
    if (buttonMessage === "Start") {
      setButtonMessage("Reset");
    } else {
      setButtonMessage("Start");
      circle.classList.remove("animate-10", "animate-20");
      setCurrentExercise("");
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

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  return (
    <div className="h-screen text-center flex flex-col rounded">
      <div className="bg-beige flex flex-col items-center justify-center mb-2 mx-auto w-4/5 p-4 rounded">
        <div className='mb-16'>
          {/* removing SVG due to unstable animation durations
          <svg className = "svg z-10" height="11em" width="14em">
            <circle className="circle" cx="50%" cy="50%" r="4rem" stroke="#e76f51" stroke-width="5" fill-opacity="0" />
          </svg> */}
          {workoutList.length > 0 && buttonMessage === "Start" &&
            <div className="text-3xl font-semibold h-28 italic pt-12">Press start when you're ready!</div>
          }
          {workoutList.length > 0 && buttonMessage === "Reset" &&
            <div className="text-8xl font-semibold pt-3 h-28">{seconds}</div>
          }
          {workoutList.length === 0 &&
            <div className="text-3xl font-semibold h-28 italic m-auto pt-12">Start by adding exercises to your workout</div>
          }
       </div>
        <button className={`text-4xl font-semibold z-20 ${workoutList.length > 0 ? "bg-yellow  text-black" : "bg-yellow  text-black bg-opacity-20 text-opacity-20"} px-6 py-2 rounded`}
          disabled={workoutList.length === 0} onClick={toggleTimer}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
            {buttonMessage}
        </button>
      </div>
      <div className='text-3xl font-bold my-0 mx-auto bg-beige rounded w-4/5 p-2'>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.listOrder.map((listId) => {
            const list = state.lists[listId];
            const exercises = list.exerciseIds.map((exerciseId) => state.exercises[exerciseId]);
            return < ExerciseList key={list.id} list={list} exercises={exercises} />
          })}
        </DragDropContext>
      </div>
      {isOpen &&
        <Popup isOpen={setIsOpen} />
      }
      {isHovering && workoutList.length === 0 &&
        <MouseOverPopover />
      }
    </div>
  );
}

export default App;
