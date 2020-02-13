import React from "react";
import { Button } from "semantic-ui-react";

const Pagination = React.memo(
  ({ onPrevPress, prevPage, onNextPress, nextPage }) => (
    <Button.Group widths="2">
      <Button
        disabled={prevPage === ""}
        labelPosition="left"
        icon="left chevron"
        content="PrevPage"
        onClick={onPrevPress}
      />
      <Button
        disabled={nextPage === ""}
        labelPosition="right"
        icon="right chevron"
        content="NextPage"
        onClick={onNextPress}
      />
    </Button.Group>
  )
);

export { Pagination };
