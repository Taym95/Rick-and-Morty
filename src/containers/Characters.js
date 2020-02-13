import React, { useEffect } from "react";
import { produce } from "immer";
import { Divider } from "semantic-ui-react";
import { Pagination, Error } from "../components";
import { CharactersList } from "./CharactersList";
import { getCharacter, searchByPage } from "../api";

const reducer = (state, { type, characters, nextPage, prevPage, error }) => {
  switch (type) {
    case "INIT":
      return {
        characters,
        nextPage,
        prevPage
      };
    case "ERROR":
      return produce(state, draftState => {
        draftState.error = error;
      });
    default:
      return state;
  }
};

// Don’t block something the user will see first because of something the user will not see first.
const Characters = React.memo(() => {
  const initialState = {
    characters: [],
    nextPage: "",
    prevPage: "",
    error: null
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const loadData = data => {
    dispatch({
      type: "INIT",
      characters: data.results,
      prevPage: data.info.prev,
      nextPage: data.info.next
    });
  };

  const onError = data => {
    dispatch({
      type: "ERROR",
      error: data.toString()
    });
  };

  useEffect(() => {
    getCharacter()
      .then(data => {
        loadData(data);
      })
      // Handling fetches data errors:
      // of course, we can do better than logging or throwing an error
      // we can show a not found screen
      // or if we are using sentry we can send the error to sentry
      // I will dispatch "ERROR" action with error to show the error on UI 
      .catch(error => {
        onError(error);
      });
  }, []);

  const onNextPress = React.useCallback(() => {
    const url = state.nextPage.replace("https://rickandmortyapi.com/api/", "");
    searchByPage(url).then(response => loadData(response));
  }, [state.nextPage]);
  const onPrevPress = React.useCallback(() => {
    const url = state.prevPage.replace("https://rickandmortyapi.com/api/", "");
    searchByPage(url).then(response => loadData(response));
  }, [state.prevPage]);

  return (
    <>
      <Pagination
        onNextPress={onNextPress}
        onPrevPress={onPrevPress}
        prevPage={state.prevPage}
        nextPage={state.nextPage}
      />
      <Divider />
      {state.error ? (
        <Error error={state.error} />
      ) : (
        <CharactersList characters={state.characters} />
      )}
    </>
  );
});

export { Characters };
