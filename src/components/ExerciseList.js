import React from "react";
import Exercise from "./Exercise";
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ExerciseList({list, exercises}) {
  return (
    <div className="">
      <h1 className="text-xl mb-2">{exercises.length > 0 ? list.message : "Drag exercises below to add them to your workout"}</h1>
        <Droppable droppableId={list.id} key={list.id} direction="horizontal">
          {provided => (
            <div
            className="flex justify-center flex-wrap"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {exercises.map((exercise, index) => <Exercise key={exercise.id} exercise={exercise} index={index} />)}
              {provided.placeholder}
              {exercises.length === 0 &&
                <div className="flex justify-center flex-wrap">
                  <div className="h-24 m-2 w-24 border-yellow border-dashed border-4 rounded flex justify-center items-center">
                    <div className="text-6xl text-center text-yellow my-auto">
                    <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                </div>
              }
            </div>
          )}
        </Droppable>
    </div>
  )
}
