import React from "react";
import styles from "./styles.module.css";

const Dot = ({ int, onClick }) => {
  const style = {
    opacity: int / 10,
  };

  return (
    <div
      className={styles.dot}
      style={style}
    ></div>
  );
};

export default Dot;
