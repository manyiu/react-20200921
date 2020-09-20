import React from "react";
import Dots from "./components/dots";
import Loading from "./components/loading";

import "./App.css";
import useData from "./hooks/useData";
import usePause from "./hooks/usePause";

const App = () => {
  const [data, setPause] = usePause(useData);

  return data.length > 0 ? (
    <Dots data={data} onClick={setPause} />
  ) : (
    <Loading />
  );
};

export default App;
