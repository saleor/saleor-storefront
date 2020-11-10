import Output from "editorjs-react-renderer";
import React from "react";

export interface IProps {
  descriptionJson: string;
}

export const RichTextContent: React.FC<IProps> = ({ descriptionJson }) => {
  return (
    <>{descriptionJson && <Output data={JSON.parse(descriptionJson)} />}</>
  );
};
