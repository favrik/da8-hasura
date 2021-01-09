const TASK_LEVELS = ['a', 'b', 'c'];

const TaskLevelSelector = ({ handler, currentLevel }) => {
  const buildSelector = () => {
    return TASK_LEVELS.map((item, index) => {
      return (
        <label key={index}>
          <input type="radio" name="level" onChange={handler} checked={currentLevel === item} value={item} /> {item.toUpperCase()}
        </label>
      );
    });
  };

  return buildSelector();
}

export { TASK_LEVELS, TaskLevelSelector as default };
