import { IconButton } from "@components/atoms/IconButton/IconButton";
import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
type Props = {
  search: string;
  closeSearch: () => void;
};
const NothingFound: React.FC<Props> = ({ search, closeSearch }) => {
  return (
    <Flex>
      <div className="search__products--not-found">
        <p className="u-lead u-lead--bold u-uppercase">
          <FormattedMessage
            defaultMessage="Sorry, but we couldn’t match any search results for: {search}"
            values={{ search }}
          />
        </p>
        <p>
          <FormattedMessage defaultMessage="Don’t give up - check the spelling, think of something less specific and then use the search bar above." />
        </p>
      </div>
      <IconButton
        name="x"
        size={19}
        onClick={closeSearch}
        testingContext="closeOverlayButton"
      />
    </Flex>
  );
};

export default NothingFound;
