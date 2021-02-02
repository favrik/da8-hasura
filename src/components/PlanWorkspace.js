import React, { useState, useCallback, useRef, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskDisplay from './TaskDisplay';
import CurrentDate from './CurrentDate';
import KeyboardHelper from './KeyboardHelper';
import DA8, { itemNavigator } from '../lib/DA8';

const PlanWorkspace = ({ plan }) => {
  const [selectedItem, setSelectedItem] = useState({ id: null });
  const [editing, setEditing] = useState(false);

  const handleEdit = (event) => {
    const description = event.target.value;

    if (event.key === 'Enter' && validTask(description)) {
      const submittedTask = { id: selectedItem.id, description, level, plan_id: planId };
      const newTask = { [level]: [...tasks[level], submittedTask] };

      updateMutateTask({ variables: submittedTask, update: updateTaskCache(submittedTask) });
      setTasks({ ...tasks, ...newTask });
      setEditing(!editing);
    }
  };

  return (
    <div tabIndex="0" style={{background: ''}}>
      <CurrentDate plan={plan} />

      <TaskInput plan_id={plan.id} />

      <TaskDisplay tasks={plan.tasks} selectedItem={selectedItem} editMode={editing} handleEdit={handleEdit} />

      <style jsx>{`
        div:focus {
          border: 0 none;
          outline: 0 none;
        }
        input {
          border: 0 none;
          border-bottom: 1px solid #000;
          padding: .5rem;
          background: transparent;
          width: 30%;
        }
      `}</style>
    </div>
  );
};

export { PlanWorkspace };
