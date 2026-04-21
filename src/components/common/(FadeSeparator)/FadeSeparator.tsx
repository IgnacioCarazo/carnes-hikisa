"use client";

import styles from "./FadeSeparator.module.css";

type FadeSeparatorProps = {
  height: number | string;
  color?: string;
  endColor?: string; // color to fade into (default white)
};

const FadeSeparator = ({
  height,
  color = "#800300",
  endColor = "#ffffff",
}: FadeSeparatorProps) => {
  return (
    <div
      className={styles.fadeSeparator}
      style={
        {
          "--separator-height":
            typeof height === "number" ? `${height}px` : height,
          "--separator-color": color,
          "--separator-end": endColor,
        } as React.CSSProperties
      }
    />
  );
};

export default FadeSeparator;