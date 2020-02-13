import React from "react";
import { Icon, Accordion, Placeholder } from "semantic-ui-react";

const Episode = React.memo(
  ({ index, title, activeIndex, handleClick, episodes }) => {
    return (
      <>
        <Accordion.Title
          active={activeIndex === index}
          index={index}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          {title}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          {episodes.length === 0 ? (
            <Placeholder data-testid="loading">
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          ) : (
            <>
              <p>Episodes featured on:</p>
              <p>{episodes.map(episode => `${episode}, `)}</p>
            </>
          )}
        </Accordion.Content>
      </>
    );
  }
);

export { Episode };
