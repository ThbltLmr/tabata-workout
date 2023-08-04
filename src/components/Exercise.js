import {Draggable} from 'react-beautiful-dnd';

export default function Exercise({exercise, index}) {
  return (
    <Draggable draggableId={exercise.id} index={index} key={exercise.id}>
      {(provided) => (
        <div className="Exercise"
            id={exercise.id}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
          <img className="ExerciseImage" alt={exercise.name} src= {exercise.thumbnail}></img>
        </div>)}
    </Draggable>
  )
}
