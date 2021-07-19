import * as React from "react";
import { Helmet } from "react-helmet";

import { Consumer as MetaConsumer } from "./context";

const Consumer: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <MetaConsumer>
    {({ title = "Thach Sanh", description, image, type, url, custom }) => (
      <>
        <Helmet
          title={title === "Saleor e-commerce" ? "Trang Chu" : title}
          meta={[
            { name: "description", content: description },
            { property: "og:url", content: url },
            { property: "og:title", content: title },
            { property: "og:description", content: description },
            { property: "og:type", content: type },
            { property: "og:image", content: image },
            ...custom,
          ]}
        />
        {children}
      </>
    )}
  </MetaConsumer>
);

export default Consumer;
