const TASK_LEVELS = ['a', 'b', 'c'];

const TaskLevelSelector = ({ handler, currentLevel }) => {
  const buildSelector = () => {
    return TASK_LEVELS.map((item, index) => {
      return (
        <label key={index}>
          <input type="radio" name="level" onChange={handler} checked={currentLevel === item} value={item} /> Level <em>{item.toUpperCase()}</em>

          <style jsx>{`
            label {
              font-family: Georgia, serif;
            }
            em {
              font-weight: bold;
            }
          `}</style>
        </label>

      );
    });
  };

  return (
    <div>
      {buildSelector()}

      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          grid-gap: 1rem;
        }
      `}</style>
    </div>
  );
}

export { TASK_LEVELS, TaskLevelSelector as default }
