export const signup = ({username, password}) => {
  return $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user: { username, password }}
  });
};

export const login = ({username, password}) => {
  return $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user: { username, password }}
  });
};

export const boardIndex = (fulldata) => {
  return $.ajax({
    method: 'GET',
    url: '/api/boards',
    data: { fulldata }
  });
};


export const logout = () => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/session'
  });
};
