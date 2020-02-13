import React from "react";
import { Icon, Accordion, Placeholder } from "semantic-ui-react";

const Location = React.memo(
  ({ index, title, activeIndex, handleClick, location }) => {
    return (
      <div data-testid="location">
        <Accordion.Title
          active={activeIndex === index}
          index={index}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          {title}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          {location ? (
            <>
              <p>Name: {location.name}</p>
              <p>Dimension: {location.dimension}</p>
              <p>Desidents: {location.residents.length}</p>
            </>
          ) : (
            <Placeholder data-testid="loading">
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          )}
        </Accordion.Content>
      </div>
    );
  }
);

export { Location };
