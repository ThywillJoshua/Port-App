import { useContext, useEffect } from "react";
import { PortContext } from "./context/PortContext";

//Components
import TrainContainer from "./components/TrainContainer";
import ShipContainer from "./components/ShipContainer";
import StorageContainer from "./components/StorageContainer";
import Button from "./components/Button";

function App() {
  const { portState, portDispatch } = useContext(PortContext);

  // NOTE: This is a work around using while loop in react, apparently it sets state asynchronously
  //instead using ref stores value synchronously without updating the UI
  useEffect(() => {
    if (
      portState.isShipInStation === true &&
      portState.shipContainerCount === 0
    ) {
      portDispatch({ type: "SHIP_NOT_IN_STATION" });
    }
  }, [portState.shipContainerCount, portDispatch, portState.isShipInStation]);

  //Render Components
  function getShipContainer() {
    const containers = [];

    for (let i = 0; i < portState.shipContainerCount; i++) {
      containers.push(<ShipContainer key={i} number={i + 1} />);
    }

    return containers;
  }

  function getStorageContainer() {
    const containers = [];

    for (let i = 0; i < portState.storageContainerCount; i++) {
      containers.push(<StorageContainer key={i} number={i + 1} />);
    }

    return containers;
  }

  function getTrainContainer() {
    const containers = [];

    for (let i = 0; i < portState.trainContainerCount; i++) {
      containers.push(<TrainContainer key={i} number={i + 1} />);
    }

    return containers;
  }

  return (
    <div className="port">
      <div className="port-container">
        <div className="port-container--ship">{getShipContainer()}</div>

        <div className="port-container--storage">{getStorageContainer()} </div>

        <div className="port-container--train">{getTrainContainer()}</div>
      </div>

      <div className="btns">
        <Button
          handler={() => portDispatch({ type: "RECIEVE_SHIP" })}
          userAction={"Recieve Ship"}
        />
        <Button
          handler={() => portDispatch({ type: "UNLOAD" })}
          userAction={"Unload"}
        />
        <Button
          handler={() => portDispatch({ type: "SEND_TRAIN" })}
          userAction={"Send Train"}
        />
      </div>
    </div>
  );
}

export default App;
