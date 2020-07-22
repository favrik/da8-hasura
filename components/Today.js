import React, { useState, useEffect } from 'react';

const Today = ({ data }) => {
  const [tasks, setTasks] = useState({ a: [], b: [], c: []});
  const [level, setLevel] = useState('a');

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handleInput = (event) => {
    const value = event.target.value;
    const charCode = String.fromCharCode(event.which).toLowerCase();

    if (event.ctrlKey && ['a', 'b', 'c'].includes(charCode)) {
      setLevel(charCode);
    }

    if (event.key === 'Enter') {
      addTask(event.target.value);
      event.target.value = '';
    }
  };

  const addTask = (value) => {
    if (validTask(value)) {
      const newTask = { [level]: [...tasks[level], value] };
      setTasks({...tasks, ...newTask });
    }
  };

  const validTask = (value) => (value !== '');

  const tasksByLevel = (level) => {
    return tasks[level].map((item, index) => <li key={index}>{item}</li>)
  };

  return (
    <div>
      <label><input type="radio" name="level" onChange={handleLevelChange} checked={level === 'a'} value='a' /> A</label>
      <label><input type="radio" name="level" onChange={handleLevelChange} checked={level === 'b'} value='b' /> B</label>
      <label><input type="radio" name="level" onChange={handleLevelChange} checked={level === 'c'} value='c' /> C</label>

      <br />

      <input type="text" onKeyDown={handleInput} name="todo" />
      <ul>
        <li><h2>A</h2></li>
        {tasksByLevel('a')}
      </ul>
      <ul>
        <li><h2>B</h2></li>
        {tasksByLevel('b')}
      </ul>
      <ul>
        <li><h2>C</h2></li>
        {tasksByLevel('c')}
      </ul>
    </div>
  );
};

export default Today;
