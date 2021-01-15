const KeyboardHelper = (keyEvent) => {
  const event = keyEvent;

  const keys = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    f2: 113
  };

  return {
    f2: () => (event.keyCode === keys.f2),

    upDown: () => ([keys.up, keys.down].includes(event.keyCode)),

    ctrlLeftRight: () => event.ctrlKey && [keys.left, keys.right].includes(event.keyCode),

    right: () => event.keyCode === keys.right,

    down: () => event.keyCode === keys.down

  };
};

export default KeyboardHelper;
