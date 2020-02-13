import React, { useEffect } from "react";
import { Divider } from "semantic-ui-react";
import { MyHeader, Loading, Pagination } from "../components";
import { CharactersList } from "./CharactersList";
import { getCharacter, searchByPage } from "../api";

const reducer = (state, { type, characters, nextPage, prevPage }) => {
  switch (type) {
    case "INIT":
      return {
        characters,
        nextPage,
        prevPage
      };
    default:
      return state;
  }
};

// Don’t block something the user will see first because of something the user will not see first.
const Characters = React.memo(() => {
  const initialState = {
    characters: [],
    nextPage: "",
    prevPage: ""
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

  useEffect(() => {
    getCharacter()
      .then(data => {
        loadData(data);
      })
      .catch(error => {
        console.log(error);
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
      <MyHeader title={"Rick and Morty characters"} />
      <Pagination
        onNextPress={onNextPress}
        onPrevPress={onPrevPress}
        prevPage={state.prevPage}
        nextPage={state.nextPage}
      />
      <Divider />
      {state.characters.length === 0 ? (
        <Loading />
      ) : (
        <CharactersList characters={state.characters} />
      )}
    </>
  );
});

export { Characters };
