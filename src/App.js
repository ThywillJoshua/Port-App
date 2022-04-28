import { useEffect, useState } from "react";
import "./App.css";

//Components
import TrainContainer from "./components/TrainContainer";
import ShipContainer from "./components/ShipContainer";
import StorageContainer from "./components/StorageContainer";
import Button from "./components/Button";

function App() {
  const [isShipInStation, setIsShipInStation] = useState(false);
  const [shipContainerCount, setShipContainerCount] = useState(0);
  const [storageContainerCount, setStorageContainerCount] = useState(0);
  const [trainContainerCount, setTrainContainerCount] = useState(0);

  // TODO: This is a work around using while loop in react, apparently sets state asynchronously
  // and advises no to use while loop as it causes an infinite loop
  const [unload, setUnload] = useState(true);

  useEffect(() => {
    (() => {
      const c1 = storageContainerCount >= 1 && trainContainerCount < 3;
      const c2 = shipContainerCount >= 1 && storageContainerCount < 5;

      if (c1) rightCrane();
      if (c2) leftCrane();
    })();
  }, [unload, storageContainerCount]);

  //Cranes
  function rightCrane() {
    setStorageContainerCount(storageContainerCount - 1);
    setTrainContainerCount(trainContainerCount + 1);
  }

  function leftCrane() {
    setShipContainerCount(shipContainerCount - 1);
    setStorageContainerCount(storageContainerCount + 1);
  }

  //Btn Handlers
  function recieveShipHandler() {
    setIsShipInStation(true);
    setShipContainerCount(4);
  }

  function unloadHandler() {
    setUnload(!unload);
  }

  function sendTrainHandler() {
    setTrainContainerCount(0);
  }

  //Render Components
  function getShipContainer() {
    const containers = [];

    for (let i = 0; i < shipContainerCount; i++) {
      containers.push(<ShipContainer key={i} number={i + 1} />);
    }

    return containers;
  }

  function getStorageContainer() {
    const containers = [];

    for (let i = 0; i < storageContainerCount; i++) {
      containers.push(<StorageContainer key={i} number={i + 1} />);
    }

    return containers;
  }

  function getTrainContainer() {
    const containers = [];

    for (let i = 0; i < trainContainerCount; i++) {
      containers.push(<TrainContainer key={i} number={i + 1} />);
    }

    return containers;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="ship-area">{getShipContainer()}</div>

        <div className="storage-area">{getStorageContainer()} </div>

        <div className="train-area">{getTrainContainer()}</div>
      </div>

      <div className="btns">
        <Button handler={recieveShipHandler} userAction={"Recieve Ship"} />
        <Button handler={unloadHandler} userAction={"Unload"} />
        <Button handler={sendTrainHandler} userAction={"Recieve Ship"} />
      </div>
    </div>
  );
}

export default App;
