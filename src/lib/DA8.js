const DA8 = {
  levels: ['a', 'b', 'c']
};

const itemNavigator = (items, currentItem, directionCheck) => {
  const direction = directionCheck ? 1 : -1;
  const currentIndex = items.findIndex((item) => item === currentItem);
  let nextIndex = currentIndex + 1 * direction

  if (nextIndex > (items.length - 1)) {
    nextIndex = 0;
  }

  if (nextIndex < 0) {
    nextIndex = items.length - 1;
  }

  return nextIndex;
};

export { itemNavigator, DA8 as default };
