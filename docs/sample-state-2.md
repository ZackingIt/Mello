```js
state = {
  // header state
  //note that asyncStatus enables us to display 'Loading' interstitial.
boards: {1: {
              title: "Building a house",
              listIds: [2, 3, 4]
            },
        2: {
              title: "Building a house",
              listIds: [2, 3, 4]
            }
        },
lists: {3: {
              boardId: 1,
              title: "First List",
              cardIds: [22, 30, 40]
            },
        4:  {
              boardId: 1,
              title: "Second List",
              cardIds: [22, 30, 40]
            }
        },
cards: {22: {
            listId: 4,
            body: "I herd u liek mudkipz",
            due_date: "Sun June 18 2017",
            commentIds: [3,4,5]
            },
        30: {
            listId: 4,
            body: "I herd u liek mudkipz",
            due_date: "Sun June 18 2017",
            commentIds: [3,4,5]
            },
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
