import * as React from "react";
import { Helmet } from "react-helmet";

import { Consumer as MetaConsumer } from "./context";

class Consumer extends React.Component {
  render() {
    return (
      <MetaConsumer>
        {({ title, description, image, type, url, custom }) => (
          <>
            <Helmet
              title={title}
              meta={[
                { name: "description", content: description },
                { property: "og:url", content: url },
                { property: "og:type", content: type },
                { property: "og:image", content: image },
                ...custom
              ]}
            />
            {this.props.children}
          </>
        )}
      </MetaConsumer>
    );
  }
}

export default Consumer;
