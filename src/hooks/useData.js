import { useEffect, useState } from "react";
import axios from "axios";

const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: { data: dataFromAPI = [] } = {} } = await axios.get(
        `${process.env.REACT_APP_API_URL}/`
      );

      setData(dataFromAPI);
    };

    const updateData = async () => {
      const { data: { data: dataFromAPI = 0 } = {} } = await axios.get(
        `${process.env.REACT_APP_API_URL}/single`
      );

      setData((previousData) => [...previousData.slice(1), dataFromAPI]);
    };

    fetchInitialData();

    const intervalID = setInterval(updateData, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return data;
};

export default useData;
