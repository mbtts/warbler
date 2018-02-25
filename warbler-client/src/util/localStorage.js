const key = {
  USER: "USER"
};

const read = key => {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    // unable to read
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // unable to save
  }
};

const destroy = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // unable to remove
  }
};

export { key, read, write, destroy };
