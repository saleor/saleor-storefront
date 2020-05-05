import * as React from 'react';
import { PageHeader } from "../Header/PageHeader";

export const CollectionSamples = (props) => {

  const handleClick = () => {
    props.history.goBack()
  }

  return (
    <div>
      <PageHeader handleClick={handleClick}/>
      <div>
        <div>Samples</div>
        <div>Coming Soon...</div>
      </div>
    </div>
  )
}