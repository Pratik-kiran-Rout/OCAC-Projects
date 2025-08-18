import './App.css';
// import { useState } from 'react';
import CounterApp from './counter/Counter';
import WeatherApp from './Weather/Weather';
import RecipeMenu from './recipe/RecipeMenu';
import TodoApp from './todo/TodoApp';

function App() {
  return (
    <div className='App'>
      {/* Toggle the pages by commenting/uncommenting */}
      { <WeatherApp/> }
      { <CounterApp/> }
      { <RecipeMenu/> }
      { <TodoApp/> }
    </div>
  );
}

export default App;
