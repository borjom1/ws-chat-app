export const setUser = user => {
  localStorage.setItem('USER', JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('USER'));
};