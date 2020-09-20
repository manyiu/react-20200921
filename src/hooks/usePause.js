import { useCallback, useRef } from "react";

const usePause = (dataHook) => {
  const rawData = dataHook();
  const updateRef = useRef(true);
  const saveDataRef = useRef(rawData);

  const displayData = updateRef.current ? rawData : saveDataRef.current;

  const onPauseHandler = useCallback(() => {
    saveDataRef.current = rawData;
    updateRef.current = !updateRef.current;
  }, [rawData]);

  return [displayData, onPauseHandler];
};

export default usePause;
