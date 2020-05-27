import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Page from "./Page";
import { TypedAllSampleQuery } from "./queries";
import { SaleorCategoryIds } from "../../constants";

type ViewProps = RouteComponentProps<{ id: string }>;

export const View: React.FC<ViewProps> = ({ history }) => {
  const variables = {
    catId: SaleorCategoryIds.Sample,
    pageSize: 100,
  };

  return (
    <div className="home-page slider-page">
      <TypedAllSampleQuery errorPolicy="all" variables={variables}>
        {({ data }) => {
          return (
            <div>
              <Page data={data} history={history} />
            </div>
          );
        }}
      </TypedAllSampleQuery>
    </div>
  );
};

export default View;
