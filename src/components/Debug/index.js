import styles from "./index.module.css";

import React from "react";

const Debug = (data) => (
  <span className={styles.debug}>{JSON.stringify(data, null, 2)}</span>
);

export default Debug;
