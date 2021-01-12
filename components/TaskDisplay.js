import { useCallback } from 'react';
import { TASK_LEVELS } from './TaskLevelSelector';

const TaskDisplay = ({ selectedItem, tasks, editMode, handleEdit }) => {
  const editInput = useCallback(node => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  const tasksByLevel = (items) => {
    return items.map((item, index) => {
      const selectedClass = selectedItem.id === item.id ? 'selected' : '';
      const description = editingInput(editMode && selectedClass === 'selected', item.description);
      return <li className={selectedClass} key={`${item.level}${index}`}>{item.id} {description}</li>
    });
  };

  const editingInput = (isEditing, description) => {
    if (isEditing) {
      return <input ref={editInput} type="text" name="edit" onKeyDown={handleEdit} defaultValue={description} />;
    }

    return description;
  };

  const buildTaskList = () => {
    return TASK_LEVELS.map((item, index) => {
      return (
        <div>
          <h2>{item.toUpperCase()}</h2>
          <ul key={item}>
            {tasksByLevel(tasks[item])}
          </ul>

          <style jsx>{`
            h2 {
              font-size: 100px;
              margin: 0;
              padding: 0;
              line-height: 1;
            }
          `}</style>
        </div>
      );
    });
  };

  return buildTaskList();
}

export default TaskDisplay;
