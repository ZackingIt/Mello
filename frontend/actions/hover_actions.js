export const CREATE_DROPZONE = "CREATE_DROPZONE";

export const createDropZone = (dropParams) => {
  return {
    type: CREATE_DROPZONE,
    response: dropParams,
  };
};


export const generateDropZone = (dropParams) => {
  return (dispatch) => {
    dispatch(createDropZone(dropParams));
  };
};
