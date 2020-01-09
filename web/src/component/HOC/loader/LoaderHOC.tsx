import React, { ReactElement, FunctionComponent, Children } from "react";
import Loader, { LoaderProps } from "./../../loader/Loader";
import "./LoaderHOC.scss";

/**
 *
 * @param WrappedComponent {React.ComponentType<T>} This will include Wrapped Component of type
 * provided to function at the time of function call.
 * @param showLoader {() => boolean} a handler for showing the loader in place of component.
 * It shows loader when showLoader handler returns true otherwise it shows the actual component
 *
 * @param loaderProps {LoaderProps} props that needs to be send to loader compoenents
 * 
 * @example
 * 
 *   const roomListLoadCondition = (): boolean => {
        return {any condition};
     };
 * 
 *  const RoomListWithLoader = withLoader<RoomListProps>(
    RoomList,
    roomListLoadCondition,
    {
      size: "large"
    }
  );
 */
export default function withLoader<T>(
  WrappedComponent: React.ComponentType<T>,
  showLoader: () => boolean,
  loaderProps: LoaderProps
): FunctionComponent<T> {
  // return React Component Definition
  /**
   * props  ==> props of Wrapped Component + Props for the loader
   */
  return function(props: T): ReactElement {
    return (
      <React.Fragment>
        {showLoader() ? (
          <div className="loader-container">
            <Loader {...loaderProps} />
          </div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </React.Fragment>
    );
  };
}
