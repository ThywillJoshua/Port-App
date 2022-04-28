import { useEffect, useRef, useState } from "react";
import "./App.css";

//Components
import TrainContainer from "./components/TrainContainer";
import ShipContainer from "./components/ShipContainer";
import StorageContainer from "./components/StorageContainer";
import Button from "./components/Button";

function App() {
  const [isShipInStation, setIsShipInStation] = useState(false);
  const [shipContainerCount, setShipContainerCount] = useState(0);
  const shipContainerRef = useRef(shipContainerCount);

  const [storageContainerCount, setStorageContainerCount] = useState(0);
  const storageContainerRef = useRef(storageContainerCount);

  const [trainContainerCount, setTrainContainerCount] = useState(0);
  const trainContainerRef = useRef(trainContainerCount);

  // NOTE: This is a work around using while loop in react, apparently it sets state asynchronously
  //instead using ref stores value synchronously without updating the UI
  useEffect(() => {
    if (isShipInStation === true && shipContainerCount === 0) {
      setIsShipInStation(false);
    }
  }, [shipContainerCount]);

  //Cranes
  function rightCrane() {
    storageContainerRef.current = --storageContainerRef.current;
    trainContainerRef.current = ++trainContainerRef.current;
  }

  function leftCrane() {
    shipContainerRef.current = --shipContainerRef.current;
    storageContainerRef.current = ++storageContainerRef.current;
  }

  //Btn Handlers
  function recieveShipHandler() {
    setIsShipInStation(true);
    shipContainerRef.current = 4;
    setShipContainerCount(4);
  }

  function unloadHandler() {
    while (true) {
      let quit = false;
      const c1 =
        storageContainerRef.current >= 1 && trainContainerRef.current < 3;
      const c2 =
        shipContainerRef.current >= 1 && storageContainerRef.current < 5;

      if (c1) {
        rightCrane();
      } else if (c2) {
        leftCrane();
      } else {
        setShipContainerCount(shipContainerRef.current);
        setTrainContainerCount(trainContainerRef.current);
        setStorageContainerCount(storageContainerRef.current);
        quit = true;
      }

      if (quit) break;
    }
  }

  function sendTrainHandler() {
    trainContainerRef.current = 0;
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
        <Button handler={sendTrainHandler} userAction={"Send Train"} />
      </div>
    </div>
  );
}

export default App;
