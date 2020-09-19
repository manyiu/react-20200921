import React, { useRef } from "react";
import Dots from "./components/dots";
import Loading from "./components/loading";

import "./App.css";
import useData from "./hooks/useData";

const App = () => {
  const rawData = useData();
  const updateRef = useRef(true);
  const saveDataRef = useRef(rawData);

  const displayData = () => {
    if (updateRef.current) {
      return rawData;
    } else {
      return saveDataRef.current;
    }
  };

  const onClickHandler = () => {
    saveDataRef.current = rawData;
    updateRef.current = !updateRef.current;
  };

  return displayData().length > 0 ? (
    <Dots data={displayData()} onClick={onClickHandler} />
  ) : (
    <Loading />
  );
};

export default App;
