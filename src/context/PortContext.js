import { createContext, useReducer, useRef } from "react";

export const PortContext = createContext();

const PortProvider = ({ children }) => {
  const shipContainerRef = useRef(0);
  const storageContainerRef = useRef(0);
  const trainContainerRef = useRef(0);

  const initialState = {
    isShipInStation: false,
    shipContainerCount: shipContainerRef.current,
    storageContainerCount: storageContainerRef.current,
    trainContainerCount: trainContainerRef.current,
  };

  const [portState, portDispatch] = useReducer(portReducer, initialState);

  //Cranes
  function rightCrane() {
    storageContainerRef.current = --storageContainerRef.current;
    trainContainerRef.current = ++trainContainerRef.current;
  }

  function leftCrane() {
    shipContainerRef.current = --shipContainerRef.current;
    storageContainerRef.current = ++storageContainerRef.current;
  }

  function portReducer(state, action) {
    switch (action.type) {
      case "RECIEVE_SHIP":
        shipContainerRef.current = 4;
        return {
          ...state,
          isShipInStation: true,
          shipContainerCount: shipContainerRef.current,
        };

      case "UNLOAD":
        while (true) {
          let quit = false;

          //Conditions
          const c1 =
            storageContainerRef.current >= 1 && trainContainerRef.current < 3;
          const c2 =
            shipContainerRef.current >= 1 && storageContainerRef.current < 5;

          if (c1) {
            rightCrane();
          } else if (c2) {
            leftCrane();
          } else {
            quit = true;
            return {
              ...state,
              shipContainerCount: shipContainerRef.current,
              trainContainerCount: trainContainerRef.current,
              storageContainerCount: storageContainerRef.current,
            };
          }

          if (quit) break;
        }

      case "SEND_TRAIN":
        trainContainerRef.current = 0;
        return {
          ...state,
          trainContainerCount: trainContainerRef.current,
        };

      case "SHIP_NOT_IN_STATION":
        return {
          ...state,
          isShipInStation: false,
        };

      default:
        return { state };
    }
  }

  return (
    <PortContext.Provider
      value={{
        portState,
        portDispatch,
      }}
    >
      {children}
    </PortContext.Provider>
  );
};

export default PortProvider;
