import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
// import { TypedCollectionSlugQuery } from "../queries";
import Page from "./Page";

type ViewProps = RouteComponentProps<{ id: string }>;

const View: React.FC<ViewProps> = ({ match, history }) => {

  return (
    <div className="home-page">
      {/*<TypedCollectionSlugQuery errorPolicy="all" variables={variables}>*/}
      {/*  {({ data }) => {*/}
      {/*    return (*/}
      <div>
        <Page history={history}/>
      </div>
      {/*);*/}
      {/*}}*/}
      {/*</TypedCollectionSlugQuery>*/}
    </div>
  )
};

export default View;
