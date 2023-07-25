import { useState } from 'react';

export default function Exercises() {
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
  return (
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
  )
}
