import { SAMPLES_PER_PAGE } from "@temp/core/config";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Page from "./Page";
import { TypedAllSampleQuery } from "./queries";
// import './scss/index.scss';

type ViewProps = RouteComponentProps<{ id: string }>;

const STATIC_CAT_SAMPLE_ID = "Q2F0ZWdvcnk6MjM=";

const View: React.FC<ViewProps> = ({ history }) => {
  const variables = {
    catId: STATIC_CAT_SAMPLE_ID,
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
