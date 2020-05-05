import * as React from "react";
import { PageHeader } from "../Header/PageHeader";

export const ViewDetails = (props) => {

  const handleClick = () => {
    props.history.goBack()
  }

  return (
    <div>
      <PageHeader handleClick={handleClick}/>
      <div>
        <div>View Details</div>
        <div>Coming Soon...</div>
      </div>
    </div>
  )
}