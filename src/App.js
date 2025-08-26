import './App.css';
// import { useState } from 'react';
import CounterApp from './counter/Counter';
import WeatherApp from './Weather/Weather';
import RecipeMenu from './recipe/RecipeMenu';
import TodoApp from './todo/TodoApp';
import TicTacToe from './tic_tac_toe/TicTacToe';
import ThemeSwitcher from './theme/theme';
import ImageToggle from './image-toggle/ImageToggle';

function App() {
  return (
      <div className='App'>
        {<ImageToggle />}
        {<WeatherApp />}
        {<CounterApp />}
        {<RecipeMenu />}
        {<TodoApp />}
        {<TicTacToe />}
        {<ThemeSwitcher />}
      </div>
  );
}

export default App;
