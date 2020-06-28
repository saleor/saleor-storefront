import ReactDOM from "react-dom";

export const getContentWindowHeight = () => {
  const headerRef = document.getElementById("header");
  const footerRef = document.getElementById("footer");
  const headerHeight = headerRef ? headerRef.offsetHeight : 0;
  const footerHeight = footerRef ? footerRef.offsetHeight : 0;

  return window.innerHeight - headerHeight - footerHeight;
};

const DEFAULT_BACKGROUND_COLOR = "#fff";
/**
 * Get the element background color.
 * If no background color is provided then the default is rgba(0, 0, 0, 0)
 * in this case the default color to cover is white (#fff)
 * @param ref Reference to the element to check.
 */
export const getBackgroundColor = (ref: any): string => {
  /* eslint-disable-next-line react/no-find-dom-node */
  const el = ReactDOM.findDOMNode(ref);
  if (el && el.parentElement) {
    if (el.nodeName === "BODY") {
      return DEFAULT_BACKGROUND_COLOR;
    }
    const bgColor = window.getComputedStyle(el.parentElement, null)
      .backgroundColor;

    if (bgColor && bgColor !== "rgba(0, 0, 0, 0)") {
      return bgColor;
    }

    return getBackgroundColor(el.parentElement);
  }
  return DEFAULT_BACKGROUND_COLOR;
};
