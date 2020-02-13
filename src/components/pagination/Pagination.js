import React from "react";
import { Button } from "semantic-ui-react";

const Pagination = React.memo(
  ({ onPrevPress, prevPage, onNextPress, nextPage }) => {
    const onPrevClick = () => {
      console.log("onPrevPress");
      onPrevPress();
    };
    const onNextClick = () => {
      console.log("onNextPress"); 
      onNextPress();
    };
    return (
      <Button.Group widths="2" data-testid="pagination">
        <Button
          data-testid="pagination-prevPage"
          disabled={prevPage === ""}
          labelPosition="left"
          icon="left chevron"
          content="PrevPage"
          onClick={onPrevClick}
        />
        <Button
          data-testid="pagination-nextPage"
          disabled={nextPage === ""}
          labelPosition="right"
          icon="right chevron"
          content="NextPage"
          onClick={onNextClick}
        />
      </Button.Group>
    );
  }
);

export { Pagination };
