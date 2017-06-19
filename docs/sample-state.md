```js
state = {
  // header state
  //note that asyncStatus enables us to display 'Loading' interstitial.
  header: {
    asyncStatus: "SUCCESS",
    error: null,
    data: {
      boards: [
        {
          id: 1,
          title: "My Board",
        }
      ]
      user: {
        id: 1,
        username: "zackyang",
        name: "Zack Yang"
      }
    }
  }

  // index state
  boardIndex: {
    asyncStatus: "SUCCESS",
    error: null,
    data: [
      {
        id: 1,
        title: "My board",
        private: false,
      },
      {
        id: 54,
        title: "Other board",
        private: false,
      }
    ],
  },

  // show state for board
  boardShow: {
    asyncStatus: "SUCCESS",
    error: null,
    data: {
      id: 1,
      title: "My Board",
      lists: [
        {
          id: 22,
          title: "First list",
          cards: [
            {
              id: 3,
              body: "First todo"
            },
            {
              id: 1,
              body: "Second todo"
            },
          ],
        },
        {
          id: 22,
          title: "Second list",
          cards: []
        }
      ]
    }
  }

  cardModal: {
    asyncStatus: "SUCCESS",
    error: null,
    data: {
        id: 4,
        body: "I herd u liek mudkipz",
        due_date: "Sun June 18 2017",
        comments: [
          {
            id: 1,
            author_name: "Zack Yang",
            body: "Yes I do"
          }
        ]
    }
}

//How do my sample states interact with my boards??
//See examples below

// action creator
export const fetchBoards(status, error, data) => {
  return {
    type: "FETCH_BOARDS",
    asyncStatus: status,
    error: error,
    data: data,
  }
}

// thunk
export const fetchBoardsAsync() => {
  return (dispatch) => {
    dispatch(fetchBoards("LOADING", null, {}))
    API.fetchBoards()
      .then(
        (data) => {
          dispatch(fetchBoards("SUCCESS", null, data))
        },
      (error) => {
        dispatch(fetchBoards("ERROR", {}, error.responseText))
      }
    )
  }
}

//reduced reducer

case FETCH_BOARDS: //"FETCH_BOARDS"
  return {
    asyncStatus: action.asyncStatus,
    data: action.asyncStatus === "SUCCESS" ? action.data : state.data,
    error: action.error
  }
```
