import React, { useState, useCallback, useRef, useEffect } from 'react';
import TaskLevelSelector from './TaskLevelSelector';
import TaskInput from './TaskInput';
import TaskDisplay from './TaskDisplay';
import KeyboardHelper from './KeyboardHelper';
import DA8, { itemNavigator } from '../lib/DA8';
import { useQuery } from "@apollo/client";
import { GET_PLAN } from '../graphql/GetPlan';

const Now = ({ plans }) => {
  const plan = plans && plans.length ? plans[0] : null;
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

const NowQuery = () => {
  const { loading, error, data } = useQuery(GET_PLAN, {
    variables: { today: '2021-01-17' }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    console.error(error);
    return <div>Error!</div>;
  }

  return <Now plans={data.plans} />;
};

export { Now, NowQuery as default };
