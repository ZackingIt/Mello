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

export const boardIndex = ( boards ) => {
  return $.ajax({
    method: 'GET',
    url: '/api/boards',
    data: { boards }
  });
};

export const boardShow = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/boards/${id}`,
  });
};

export const createBoard = (board) => {
  return $.ajax({
    method: "POST",
    url: '/api/boards',
    data: { board }
  });
};

export const createCard = (card) => {
  return $.ajax({
    method: "POST",
    url: '/api/cards',
    data: { card },
  });
};

export const moveCard = (cardLoad) => {
  return $.ajax({
    method: "POST",
    url: `/api/moves/`,
    data: { cardLoad },
  });
};

export const createList = (list) => {
  return $.ajax({
    method: "POST",
    url: '/api/lists',
    data: { list: list }  //list sets the key: "list"
  });
};

export const editCard = (card) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/cards/${card.id}`,
    data: { card: card },
  });
};

export const logout = () => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/session'
  });
};

export const fetchUsers = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/users'
  });
};

export const addUserToBoard = (boardShareParams) => {
  return $.ajax({
    method: "POST",
    url: '/api/board_shares',
    data: { board_share: { user_id: boardShareParams.user_id, board_id: boardShareParams.board_id } }
  });
};

export const removeUserFromBoard = (boardShareParams) => {
  return $.ajax({
    method: "DELETE",
    url: '/api/board_shares',
    data: { board_share: { user_id: boardShareParams.user_id, board_id: boardShareParams.board_id } }
  });
};
