import React, { useEffect, useRef, useState } from "react";
import Dots from "./components/dots";
import Loading from "./components/loading";
import axios from "axios";

import "./App.css";

const App = () => {
  const dataRef = useRef([]);
  const updateRef = useRef(true);
  const [data, setData] = useState(dataRef.current);

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: { data: dataFromAPI = [] } = {} } = await axios.get(
        `${process.env.REACT_APP_API_URL}/`
      );
      dataRef.current = dataFromAPI;
      setData(dataFromAPI);
    };

    const updateData = async () => {
      const { data: { data: dataFromAPI = 0 } = {} } = await axios.get(
        `${process.env.REACT_APP_API_URL}/single`
      );

      dataRef.current = [...dataRef.current.slice(1), dataFromAPI];

      if (updateRef.current) {
        setData(dataRef.current);
      }
    };

    fetchInitialData();

    const intervalID = setInterval(updateData, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const onClickHandler = () => (updateRef.current = !updateRef.current);

  return data.length > 0 ? (
    <Dots data={data} onClick={onClickHandler} />
  ) : (
    <Loading />
  );
};

export default App;
