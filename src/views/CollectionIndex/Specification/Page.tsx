import * as React from "react";
import PageHeader from "../../../components/Header/PageHeader";
import { RichTextContent } from "@components/atoms";

export const Page = props => {
  const { data } = props;
  const description = JSON.parse(data.collection.descriptionJson);

  const handleClick = () => {
    props.history.goBack();
  };

  return (
    <div className="specification-wrapper inner-page-wrapper">
      <PageHeader
        back={true}
        cart={true}
        search={true}
        handleClick={handleClick}
      />
      <div>
        <div className="wrapper-header">
          <span>Set Details</span>
        </div>
        <div className="wrapper-description">
          <div>
            <RichTextContent
              descriptionJson={data.collection.descriptionJson}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
