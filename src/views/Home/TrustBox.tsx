import React from "react";

const TrustBox = () => {
  // Create a reference to the <div> element which will represent the TrustBox
  const ref = React.useRef(null);
  React.useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
  }, []);
  return (
    <div
      ref={ref} // We need a reference to this element to load the TrustBox in the effect.
      className="trustpilot-widget" // Renamed this to className.
      data-template-id="53aa8912dec7e10d38f59f36"
      data-businessunit-id="4ksEQO36m6SVMtZ7"
      data-locale="en-GB"
      data-style-height="130px"
      data-style-width="100%"
      data-theme="light"
      data-group="on"
      data-stars="1,2,3,4,5"
      // [ long list of data attributes...]
    >
      <a
        href="https://it.trustpilot.com/evaluate/storitalia.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
};
export default TrustBox;
