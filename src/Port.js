import { useContext, useEffect } from "react";
import { PortContext } from "./context/PortContext";

import TrainContainer from "./components/TrainContainer";
import ShipContainer from "./components/ShipContainer";
import StorageContainer from "./components/StorageContainer";
import Button from "./components/Button";

function App() {
  const { portState, portDispatch } = useContext(PortContext);

  useEffect(() => {
    if (
      portState.isShipInStation === true &&
      portState.shipContainerCount === 0
    ) {
      portDispatch({ type: "SHIP_NOT_IN_STATION" });
    }
  }, [portState.shipContainerCount, portDispatch, portState.isShipInStation]);

  
  function renderShipContainer() {
    const containers = [];

    for (let i = 0; i < portState.shipContainerCount; i++) {
      containers.push(<ShipContainer key={i} number={i + 1} />);
    }

    return containers;
  }

  function renderStorageContainer() {
    const containers = [];

    for (let i = 0; i < portState.storageContainerCount; i++) {
      containers.push(<StorageContainer key={i} number={i + 1} />);
    }

    return containers;
  }

  function renderTrainContainer() {
    const containers = [];

    for (let i = 0; i < portState.trainContainerCount; i++) {
      containers.push(<TrainContainer key={i} number={i + 1} />);
    }

    return containers;
  }

  return (
    <div className="port">
      <div className="port-container">
        <div className="port-container--ship">{renderShipContainer()}</div>

        <div className="port-container--storage">{renderStorageContainer()} </div>

        <div className="port-container--train">{renderTrainContainer()}</div>
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
