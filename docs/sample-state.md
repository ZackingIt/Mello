```js
//User Profile Fetch
state = {
  // index state
  boardIndexPage: {
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
  boardShowPage: {
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

  cardModalPage: {
    asyncStatus: "SUCCESS",
    error: null,
    data: {
      card: {
        id: 4,
        body: "I herd u liek mudkipz",
        due_date: "Sun Apr 16 2017 16:32:13 GMT-0400 (EDT)"
      }
  }
}

//How do my sample states interact with my boards??
//See examples below

// action creator
export const fetchBoards(status, data, error) => {
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
        dispatch(fetchBoards("ERROR", {}, error.errorMessage))
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
