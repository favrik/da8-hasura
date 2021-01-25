import { useCallback } from 'react';
import { TASK_LEVELS } from './TaskLevelSelector';

const TaskDisplay = ({ tasks, selectedItem, editMode, handleEdit }) => {
  const groupTasksByLevel = (tasks) => {
    const byLevel = { a: [], b: [], c: [] };

    for (var task of tasks) {
      byLevel[task.level].push(task);
    }

    return byLevel;
  };

  const groupedTasks = groupTasksByLevel(tasks);

  const editInput = useCallback(node => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  const tasksByLevel = (items) => {
    return items.map((item, index) => {
      const selectedClass = selectedItem.id === item.id ? 'selected' : '';
      const description = editingInput(editMode && selectedClass === 'selected', item.description);
      if (item.id < 0) {
        return <li className={`optimistic ${selectedClass}`} key={`${item.level}${item.id}`}>{description}</li>
      }
      return <li className={selectedClass} key={`${item.level}${item.id}`}>{description}</li>
    });
  };

  const editingInput = (isEditing, description) => {
    if (isEditing) {
      return <input ref={editInput} type="text" name="edit" onKeyDown={handleEdit} defaultValue={description} />;
    }

    return description;
  };

  const buildTaskList = () => {
    return TASK_LEVELS.map((level, index) => {
      return (
        <div key={level}>
          <h2>{level.toUpperCase()}</h2>
          <ul>
            {tasksByLevel(groupedTasks[level])}
          </ul>

          <style jsx>{`
            div {
              display: grid;
              gap: 1px 1px;
              grid-template-columns: 0.5fr 4fr;
            }

            h2 {
              font-family: Georgia, serif;
              font-size: 100px;
              margin: 0;
              padding: 0;
              line-height: 1;
            }

            ul {
              margin-top: .5em;
            }
          `}</style>
        </div>
      );
    });
  };

  return (
    <div className={"task-lists"}>
      {buildTaskList()}

      <style jsx>{`
        .task-lists {
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: 1fr 1fr 1fr;
        }
      `}</style>
    </div>
  );
}

export default TaskDisplay;
