import React from "react";
import { Card } from "semantic-ui-react";
import { ExtraCharacterDetails } from "../../containers";

const extraInfo = (origin, location, episode, name) => {
  return (
    <>
      <ExtraCharacterDetails
        origin={origin}
        location={location}
        episode={episode}
        name={name}
      />
    </>
  );
};

const CharacterCard = React.memo(
  ({ name, image, status, species, origin, location, episode }) => {
    return (
      <Card
        data-testid="character-card"
        image={image}
        header={`Name: ${name}`}
        meta={`Status: ${status}`}
        description={`Species: ${species}`}
        extra={extraInfo(origin, location, episode, name)}
      />
    );
  }
);

export { CharacterCard };
