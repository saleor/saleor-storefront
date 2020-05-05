import * as React from 'react';
import { PageHeader } from "../Header/PageHeader";

export const CollectionSpecification = (props) => {

  const handleClick = () => {
    props.history.goBack()
  }

  return (
    <div>
      <PageHeader handleClick={handleClick}/>
      <div>
        <div>Set Details</div>
        <div>Coming Soon...</div>
      </div>
    </div>
  )
}