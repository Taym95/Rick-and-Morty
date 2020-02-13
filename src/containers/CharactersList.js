import React from "react";
import { Card } from "semantic-ui-react";
import { CharacterCard } from "../components";

const CharactersList = React.memo(({ characters }) => {
  const charactersItems = characters.map(character => (
    <CharacterCard key={character.id} {...character} />
  ));

  return <Card.Group itemsPerRow={3}>{charactersItems}</Card.Group>;
});

export { CharactersList };
