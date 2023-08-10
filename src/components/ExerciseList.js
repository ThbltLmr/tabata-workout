import React from "react";
import Exercise from "./Exercise";
import { Droppable } from "react-beautiful-dnd";

export default function ExerciseList({list, exercises}) {
  return (
    <div className="">
      <h1 className="text-xl mb-2">{list.message}</h1>
        <Droppable droppableId={list.id} key={list.id} direction="horizontal">
          {provided => (
            <div
            className="flex justify-center flex-wrap"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {exercises.map((exercise, index) => <Exercise key={exercise.id} exercise={exercise} index={index} />)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {exercises.length === 0 &&
          <div className="h-24 flex flex-col justify-center align-middle">
            <h1 className="text-lg italic my-auto text-dark-gray">No exercises in this list yet.</h1>
          </div>
        }
    </div>
  )
}
