import React, { ReactElement, FunctionComponent, Children } from "react";
import Loader, { LoaderProps } from "./../../loader/Loader";
import "./LoaderHOC.scss";

/**
 *
 * @param WrappedComponent {React.ComponentType<T>}
 * @param loaderValidation {() => boolean} Validation function should return false
 *                                         when data is loading and true when actual
 *                                         component is required to be shown.
 */
export default function withLoader<T>(
  WrappedComponent: React.ComponentType<T>,
  loaderValidation: () => boolean,
  loaderProps: LoaderProps
): FunctionComponent<T> {
  // return React Component Definition
  /**
   * props  ==> props of Wrapped Component + Props for the loader
   */
  return function(props: T): ReactElement {
    const wrappedProps: T = props;
    return (
      <React.Fragment>
        {loaderValidation() ? (
          <WrappedComponent {...props} />
        ) : (
          <div className="loader-container">
            <Loader {...loaderProps} />
          </div>
        )}
      </React.Fragment>
    );
  };
}
