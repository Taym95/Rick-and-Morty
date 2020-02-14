import React, { useEffect } from "react";
import { Divider } from "semantic-ui-react";
import { Pagination, Error } from "../components";
import { CharactersList } from "./CharactersList";
import { getCharacter, searchByPage } from "../api";
import { charactersReducer, charactersInitialState } from "../reducers";
import { loadData, onError } from "../actions";

// Don’t block something the user will see first because of something the user will not see first.
const Characters = React.memo(() => {
  const [state, dispatch] = React.useReducer(
    charactersReducer,
    charactersInitialState
  );

  useEffect(() => {
    getCharacter()
      .then(data => {
        loadData(data, dispatch);
      })
      // Handling fetches data errors:
      // of course, we can do better than logging or throwing an error
      // we can show a not found screen
      // or if we are using sentry we can send the error to sentry
      // I will dispatch "ERROR" action with error to show the error on UI
      .catch(error => {
        onError(error, dispatch);
      });
  }, []);

  const onNextPress = React.useCallback(() => {
    const url = state.nextPage.replace("https://rickandmortyapi.com/api/", "");
    searchByPage(url).then(response => loadData(response, dispatch));
  }, [state.nextPage]);
  const onPrevPress = React.useCallback(() => {
    const url = state.prevPage.replace("https://rickandmortyapi.com/api/", "");
    searchByPage(url).then(response => loadData(response, dispatch));
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
