const formatPlanData = (data) => {
  return data.reduce((acc, task) => {
    acc[task.level].push(task);
    return acc;
  }, {a: [], b: [], c: []});
};

export default formatPlanData;
