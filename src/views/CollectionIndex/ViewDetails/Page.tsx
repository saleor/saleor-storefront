import { Paths } from "@temp/views/CollectionIndex/Page";
import * as React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/Header/PageHeader";
import { DetailRow } from "@temp/components/Collection/DetailRow";

const details = [
  { key: "Style", value: "Shaker" },
  { key: "Face Frame", value: '3/4" x -3/4" Birch' },
  { key: "Door Frame", value: "Premium HDF" },
  { key: "Door Center", value: "Premium HDF" },
  { key: "Sides", value: '1/2" A-Grade Plywood' },
  { key: "Top & Bottom(Wall)", value: '1/2" A-Grade Plywood' },
  { key: "Bottom(Base)", value: '1/2" A-Grade Plywood' },
  {
    key: "Installation/Design Note",
    value:
      "Cabinet specs are subject to change without" +
      " notice. *Cabinet measurements are typically converted from metric to inches and " +
      "manufacturers will commonly round up to the nearest 1/4 inch. " +
      'This can cause a measurement to be off by a fraction of an inch (less than 1/4") ' +
      "which is within normal industry standards*",
  },
];
export const Page = props => {
  const handleClick = () => {
    props.history.goBack();
  };

  return (
    <div className="inner-page-wrapper">
      <PageHeader
        back={true}
        cart={true}
        search={true}
        handleClick={handleClick}
      />
      <div>
        <div className="wrapper-header">Set Details</div>
        {details.map((detail, i) => {
          return <DetailRow key={i} name={detail.key} value={detail.value} />;
        })}
      </div>
    </div>
  );
};

export default Page;
