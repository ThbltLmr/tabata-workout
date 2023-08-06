import React from "react";
import Exercise from "./Exercise";
import { Droppable } from "react-beautiful-dnd";

export default function ExerciseList({list, exercises}) {
  return (
    <div className="ExerciseList">
      <h1 className="ListTitle">{list.message}</h1>
        <Droppable droppableId={list.id} key={list.id} direction="horizontal">
          {provided => (
            <div
            className="Exercises"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {exercises.map((exercise, index) => <Exercise key={exercise.id} exercise={exercise} index={index} />)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
    </div>
  )
}
