import {Draggable} from 'react-beautiful-dnd';

export default function Exercise({exercise, index}) {
  return (
    <Draggable draggableId={exercise.id} index={index} key={exercise.id}>
      {(provided) => (
        <div className="h-24 m-2"
            id={exercise.id}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
          <img className="rounded p-3 mx-2 bg-yellow h-24" alt={exercise.name} src= {exercise.thumbnail}></img>
        </div>)}
    </Draggable>
  )
}
