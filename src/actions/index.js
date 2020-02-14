export const loadOrigin = (data, dispatch) => {
  dispatch({
    type: "LOAD_ORIGIN",
    payload: data
  });
};

export const loadLocation = (data, dispatch) => {
  dispatch({
    type: "LOAD_LOCATION",
    payload: data
  });
};

export const loadEpisodes = (data, dispatch) => {
  dispatch({
    type: "LOAD_EPISODES",
    payload: data
  });
};

export const loadData = (data, dispatch) => {
  dispatch({
    type: "INIT",
    characters: data.results,
    prevPage: data.info.prev,
    nextPage: data.info.next
  });
};

export const onError = (data, dispatch) => {
  dispatch({
    type: "ERROR",
    error: data.toString()
  });
};
