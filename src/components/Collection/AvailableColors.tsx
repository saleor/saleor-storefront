import * as React from 'react';
import { PageHeader } from "../Header/PageHeader";

export const AvailableColors = (props) => {

  const handleClick = () => {
    props.history.goBack()
  }

  return(
    <div>
      <PageHeader handleClick={handleClick}/>
      <div>
        <div>Available Colors</div>
        <div>Coming Soon...</div>
      </div>
    </div>
  )
}