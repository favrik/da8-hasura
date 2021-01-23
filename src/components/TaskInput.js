import React, { useState, useRef, Fragment } from 'react';
import { useMutation } from "@apollo/client";
import ADD_TASK, { updateCache, optimisticAddTask } from '../graphql/AddTask';
import TaskLevelSelector from './TaskLevelSelector';


const TaskInput = ({ plan_id }) => {
  const input = useRef(null);
  const [level, setLevel] = useState('a');
  const [addTaskMutation] = useMutation(ADD_TASK, {
    update: updateCache
  });

  const handleNewTaskInput = (event) => {
    const value = event.target.value;

    if (event.key === 'Enter') {
      addTask(event.target.value);
      event.target.value = '';
    }
  };

  const addTask = (description) => {
    if (validTask(description)) {
      const submittedTask = { description, level, plan_id };
      addTaskMutation({
        variables: submittedTask,
        optimisticResponse: optimisticAddTask(submittedTask)
      });
    }
  };

  const validTask = (value) => value !== '';

  const handleLevelChange = (event) => setLevel(event.target.value);

  return (
    <Fragment>
      <TaskLevelSelector handler={handleLevelChange} currentLevel={level} />
      <input ref={input} autoFocus={true} autoComplete="off" type="text" onKeyDown={handleNewTaskInput} name="todo" />
    </Fragment>
  );
};

export { TaskInput as default };
