import * as React from "react";

const Page = props => {

  const { data } = props

  return (
    <div style={{
      "backgroundImage": `url(${data.collection.backgroundImage.url})`,
      "backgroundRepeat": "no-repeat",
      "backgroundSize": "cover",
      "height": "100%",
    }}>

    </div>
  );
}

export default Page;
