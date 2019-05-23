

import * as React from 'react';

export interface HelloPromptProps {
    name: string;
}

const HelloPrompt = ({name}) => {
    return (
      <div>
       <h3>Hello{name!==""?`, ${name}`: ""}</h3>
       <p>Welcome to your user account</p>
      </div>
    );
}

export default HelloPrompt;
