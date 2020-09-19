import React, { useEffect, useState } from "react";
import Dots from "./dots";
import initialData from "../data/initalLoading.json";

const Loading = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const updateData = () => {
      const nextData = (data) => [
        ...data.slice(1),
        data[data.length - 1] + 1 <= 10 ? data[data.length - 1] + 1 : 0,
      ];

      setData((previousData) => nextData(previousData));
    };

    const intervalID = setInterval(updateData, 100);

    return () => clearInterval(intervalID);
  }, []);

  return <Dots data={data} />;
};

export default Loading;
