import React, { useEffect, useMemo, useState } from 'react';
import './Todo.css';

const STORAGE_KEY = 'todo:items';

// Generate a simple unique id for items
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export default function TodoApp() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | completed

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const remaining = useMemo(() => items.filter(i => !i.done).length, [items]);
  const filtered = useMemo(() => {
    switch (filter) {
      case 'active':
        return items.filter(i => !i.done);
      case 'completed':
        return items.filter(i => i.done);
      default:
        return items;
    }
  }, [items, filter]);

  const addItem = () => {
    const value = text.trim();
    if (!value) return;
    setItems(prev => [...prev, { id: uid(), text: value, done: false }]);
    setText('');
  };

  const toggleItem = (id) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, done: !i.done } : i)));
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCompleted = () => {
    setItems(prev => prev.filter(i => !i.done));
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') addItem();
  };

  return (
    <div className="todo-app">
      <h1 className="todo-title">Todo</h1>

      <div className="todo-input-row">
        <input
          className="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Add a task and press Enter"
          aria-label="Add a new todo"
        />
        <button className="btn primary" onClick={addItem} aria-label="Add todo">Add</button>
      </div>

      <ul className="todo-list">
        {filtered.map(item => (
          <li key={item.id} className={`todo-item ${item.done ? 'done' : ''}`}>
            <label className="todo-check">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(item.id)}
                aria-label={item.done ? 'Mark as active' : 'Mark as completed'}
              />
              <span />
            </label>
            <span className="todo-text">{item.text}</span>
            <button
              className="btn danger small"
              onClick={() => deleteItem(item.id)}
              aria-label="Delete todo"
              title="Delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="todo-footer">
        <span className="muted">{remaining} item{remaining !== 1 ? 's' : ''} left</span>
        <div className="filters">
          <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`chip ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
          <button className={`chip ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <button className="btn" onClick={clearCompleted}>Clear completed</button>
      </div>
    </div>
  );
}