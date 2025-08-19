import './App.css';
// import { useState } from 'react';
import CounterApp from './counter/Counter';
import WeatherApp from './Weather/Weather';
import RecipeMenu from './recipe/RecipeMenu';
import TodoApp from './todo/TodoApp';
import TicTacToe from './tic_tac_toe/TicTacToe'; // keeps working if extension changes

function App() {
  return (
    <div className='App'>
      {/* Toggle the pages by commenting/uncommenting */}
      { <WeatherApp/>}
      { <CounterApp/>}
      { <RecipeMenu/> }
      {<TodoApp/> }
      {<TicTacToe/>}
    </div>
  );
}

export default App;
