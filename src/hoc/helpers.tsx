import * as React from "react";

const getDisplayName = (prefix: string, component: React.ComponentType) => {
  return `${prefix}(${component.displayName || component.name || "HOC"})`;
};

/**
 * Helper function for creating HOC which will inject context as a prop.
 * @param displayName - name for easier debugging
 * @param injectedPropName - under what prop context should be injected
 * @param Context - context returned by React.createContext()
 */
const createHOCFromContext = <Props extends {}>(
  displayName: string,
  injectedPropName: string,
  Context: React.Context<any>
) => <P extends Props>(WrappedComponent: React.ComponentType<P & Props>) => {
  return class HOC extends React.PureComponent<
    Pick<P, Exclude<keyof P, keyof Props>>
  > {
    static displayName = getDisplayName(displayName, WrappedComponent);
    static contextType = Context;

    render() {
      return (
        <WrappedComponent
          {...this.props as P}
          {...{ [injectedPropName]: this.context }}
        />
      );
    }
  };
};

export { createHOCFromContext, getDisplayName };
