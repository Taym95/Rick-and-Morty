import { produce } from "immer";

export const charactersInitialState = {
  characters: [],
  nextPage: "",
  prevPage: "",
  error: null
};

export const charactersReducer = (
  state,
  { type, characters, nextPage, prevPage, error }
) => {
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

export const characterDetailsInitialState = {
  characterOrigin: null,
  characterLocation: null,
  characterEpisodes: []
};
export const characterDetailsReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_ORIGIN":
      return produce(state, draftState => {
        draftState.characterOrigin = payload;
      });
    case "LOAD_LOCATION":
      return produce(state, draftState => {
        draftState.characterLocation = payload;
      });
    case "LOAD_EPISODES":
      return produce(state, draftState => {
        draftState.characterEpisodes = payload;
      });
    default:
      return state;
  }
};
