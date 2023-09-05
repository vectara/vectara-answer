let id = 0;

export const createId = () => {
  if (id === Number.MAX_SAFE_INTEGER) {
    id = 0;
  } else {
    id++;
  }

  return id.toString();
};
