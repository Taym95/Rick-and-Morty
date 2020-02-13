import React from "react";
import { Card } from "semantic-ui-react";
import { CharacterCard, Loading } from "../components";

const CharactersList = React.memo(({ characters }) => {
  const charactersItems = characters.map(character => (
    <CharacterCard key={character.id} {...character} />
  ));

  return characters.length === 0 ? (
    <Loading />
  ) : (
    <Card.Group data-testid="characters-list" itemsPerRow={3}>
      {charactersItems}
    </Card.Group>
  );
});

export { CharactersList };
