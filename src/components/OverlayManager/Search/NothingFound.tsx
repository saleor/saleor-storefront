import { Trans } from "@lingui/react";
import * as React from "react";

export const NothingFound: React.FC<{ search: string }> = ({ search }) => (
  <div className="search__products--not-found">
    <p className="u-lead u-lead--bold u-uppercase">
      <Trans id="Sorry, but we couldn’t match any search results for: “{search}”" values={{ search }} />
    </p>
  </div>
);

export default NothingFound;
