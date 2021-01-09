import React, { useState, useCallback, useRef, useEffect } from 'react';
import addTaskMutation from '../graphql/AddTask';
import updateTaskMutation, { updateTaskCache } from '../graphql/UpdateTask';
import formatPlanData from '../lib/formatPlanData';
import TaskLevelSelector from './TaskLevelSelector';
import TaskDisplay from './TaskDisplay';
import KeyboardHelper from './KeyboardHelper';

const Today = ({ initialPlan }) => {
  const planId = initialPlan.plans[0].id;
  const input = useRef(null);
  const [tasks, setTasks] = useState(formatPlanData(initialPlan.plans[0].tasks));
  const [level, setLevel] = useState('a');
  const [selectedItem, setSelectedItem] = useState({ id: null });
  const [editing, setEditing] = useState(false);
  const [mutateTask, { data, loading, error }] = addTaskMutation();

  const [updateMutateTask, { udata, uloading, uerror }] = updateTaskMutation();

  const handleLevelChange = (event) => setLevel(event.target.value);

  const handleSelectedItem = (event) => {
    const value = event.target.value;

    if (event.keyCode === KeyboardHelper.f2) {
      setEditing((previousEditing) => {
        const newEditing = !previousEditing;
        if (newEditing === false) {
          input.current.focus();
        }

        return newEditing;
      });
    }

    if ([KeyboardHelper.up, KeyboardHelper.down].includes(event.keyCode)) {
      let task = selectedItem;
      if (selectedItem === null) {
        task = tasks[level][0];
      } else {
        const direction = event.keyCode == KeyboardHelper.down ? 1 : -1;
        // TODO: validate index and make up arrow work in case there is only one task.
        const index = tasks[level].findIndex((item) => item.id === selectedItem.id) + 1 * direction;

        if (typeof tasks[level][index] !== 'undefined') {
          task = tasks[level][index];
        }
      }

      setSelectedItem(task);
    }
  };

  const handleNewTaskInput = (event) => {
    const value = event.target.value;
    const charCode = String.fromCharCode(event.which).toLowerCase();

    if (event.ctrlKey && [KeyboardHelper.left, KeyboardHelper.right].includes(event.keyCode)) {
      const levels = ['a', 'b', 'c']

      const direction = event.keyCode == KeyboardHelper.right ? 1 : -1;
      const currentLevelIndex = levels.findIndex((item) => item === level);
      let nextLevelIndex = currentLevelIndex + 1 * direction
      if (nextLevelIndex > (levels.length - 1)) {
        nextLevelIndex = 0;
      }
      if (nextLevelIndex < 0) {
        nextLevelIndex = levels.length - 1;
      }

      setLevel(levels[nextLevelIndex]);
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

      setTasks({ ...tasks, ...newTask });
    }
  };

  const validTask = (value) => value !== '';

  const handleEdit = (event) => {
    const description = event.target.value;

    if (event.key === 'Enter' && validTask(description)) {
      const submittedTask = { id: selectedItem.id, description, level, plan_id: planId };
      const newTask = { [level]: [...tasks[level], submittedTask] };

      updateMutateTask({ variables: submittedTask, update: updateTaskCache(submittedTask) });
      setTasks({ ...tasks, ...newTask });
      setEditing(!editing);
    }
  }

  if (error || uerror) {
    return 'ERROR';
  }

  return (
    <div tabIndex="0" onKeyDown={handleSelectedItem} style={{background: '#f4f4f4'}}>
      <TaskLevelSelector handler={handleLevelChange} currentLevel={level} />

      <br />

      <input ref={input} autoFocus={true} autoComplete="off" type="text" onKeyDown={handleNewTaskInput} name="todo" />

      <TaskDisplay tasks={tasks} selectedItem={selectedItem} editMode={editing} handleEdit={handleEdit} />
    </div>
  );
};

export default Today;
