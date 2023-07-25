import logo from './logo.svg';
import './App.css';
import MyButton from './components/Tabatatimer';
import TabataTimer from './components/Tabatatimer';
import Exercises from './components/Exercises';

function App() {
  const userWorkout = [
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
    <div className="App">
      <h1 className='pageTitle'></h1>
      <TabataTimer userWorkout = {userWorkout} />
      <Exercises/>
    </div>
  );
}

export default App;
