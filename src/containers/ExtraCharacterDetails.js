import React, { useState } from "react";
import { Accordion } from "semantic-ui-react";
import { getCharacterLocation, getCharacterEpisodes } from "../api";
import { Location, Episode } from "../components";
import {
  characterDetailsReducer,
  characterDetailsInitialState
} from "../reducers";
import { loadLocation, loadOrigin, loadEpisodes } from "../actions";

// Don’t block something the user will see first because of something the user will not see first.
const ExtraCharacterDetails = React.memo(
  ({ origin, location, episode, name }) => {
    const [activeIndex, useActiveIndex] = useState(3);
    const [state, dispatch] = React.useReducer(
      characterDetailsReducer,
      characterDetailsInitialState
    );

    const handleClick = (e, titleProps) => {
      const { index } = titleProps;
      const newIndex = activeIndex === index ? -1 : index;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useActiveIndex(newIndex);

      switch (index) {
        case 0:
          if (state.characterOrigin === null) getOrigin();
          break;
        case 1:
          if (state.characterLocation === null) getLocation();
          break;
        case 2:
          if (state.characterEpisodes.length === 0) getEpisodes();
          break;
        default:
          break;
      }
    };

    const getLocation = () => {
      const url = location.url.replace("https://rickandmortyapi.com/api/", "");
      getCharacterLocation(url).then(response =>
        loadLocation(response, dispatch)
      );
    };

    const getOrigin = () => {
      const url = origin.url.replace("https://rickandmortyapi.com/api/", "");
      getCharacterLocation(url).then(response =>
        loadOrigin(response, dispatch)
      );
    };

    const getEpisodes = () => {
      const urls = episode.map(url =>
        url.replace("https://rickandmortyapi.com/api/", "")
      );
      getCharacterEpisodes(urls).then(response =>
        loadEpisodes(response, dispatch)
      );
    };

    return (
      <Accordion data-testid="extra-character-details">
        <Location
          index={0}
          activeIndex={activeIndex}
          handleClick={handleClick}
          title={`${name}'s origin?`}
          location={state.characterOrigin}
        />
        <Location
          index={1}
          activeIndex={activeIndex}
          handleClick={handleClick}
          title={`${name}'s location?`}
          location={state.characterLocation}
        />
        <Episode
          index={2}
          activeIndex={activeIndex}
          handleClick={handleClick}
          title={`${name}'s episodes featured on?`}
          episodes={state.characterEpisodes}
        />
      </Accordion>
    );
  }
);

export { ExtraCharacterDetails };
