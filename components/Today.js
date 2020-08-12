import React, { useState, useEffect } from 'react';
import addTaskMutation from '../graphql/AddTask';

const formatData = (data) => {
  return data.reduce((acc, task) => {
    acc[task.level].push(task);
    return acc;
  }, {a: [], b: [], c: []});
};

const Today = ({ initialPlan }) => {
  console.log(initialPlan);
  const [tasks, setTasks] = useState(formatData(initialPlan.plans[0].tasks));
  const [level, setLevel] = useState('a');
  const planId = initialPlan.plans[0].id;
  const [mutateTask, { data, loading, error }] = addTaskMutation();

  console.log(tasks);
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

  const addTask = (description) => {
    if (validTask(description)) {
      const submittedTask = { description, level, plan_id: planId };
      const newTask = { [level]: [...tasks[level], submittedTask] };

      mutateTask({ variables: submittedTask });

      setTasks({...tasks, ...newTask });
    }
  };

  const validTask = (value) => (value !== '');

  const tasksByLevel = (items) => {
    return items.map((item, index) => <li key={index}>{item.description}</li>)
  };


  if (error) {
    return 'ERROR';
  }

  return (
    <div>
      <label><input type="radio" name="level" onChange={handleLevelChange} checked={level === 'a'} value='a' /> A</label>
      <label><input type="radio" name="level" onChange={handleLevelChange} checked={level === 'b'} value='b' /> B</label>
      <label><input type="radio" name="level" onChange={handleLevelChange} checked={level === 'c'} value='c' /> C</label>

      <br />

      <input type="text" onKeyDown={handleInput} name="todo" />
      <ul>
        <li><h2>A</h2></li>
        {tasksByLevel(tasks.a)}
      </ul>
      <ul>
        <li><h2>B</h2></li>
        {tasksByLevel(tasks.b)}
      </ul>
      <ul>
        <li><h2>C</h2></li>
        {tasksByLevel(tasks.c)}
      </ul>
    </div>
  );
};

export default Today;
