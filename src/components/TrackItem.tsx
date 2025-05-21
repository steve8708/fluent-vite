"use client";

import * as React from "react";
import { useTheme } from "../theme/ThemeProvider";
import styles from "./TrackItem.module.css";
import { Button } from "@fluentui/react-components";

export interface TrackItemProps {
  icon: string;
  label: string;
  count: string;
  onClick?: () => void;
}

export const TrackItem: React.FC<TrackItemProps> = ({
  icon,
  label,
  count,
  onClick,
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";

  return (
    <div
      className={`${styles.container} ${isDark ? styles.darkContainer : ""}`}
    >
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <div className={styles.productIcon}>
            <img
              loading="lazy"
              src={icon}
              alt={label}
              className={styles.icon}
            />
          </div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.label}>{label}</div>
          <div className={styles.count}>{count}</div>
        </div>
      </div>
      <Button
        appearance="subtle"
        className={styles.actionButton}
        onClick={onClick}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/f5348105e75441b59830f1e489577801/85ab81a7ba11e696b54ffef964a06ad9c88912e5?placeholderIfAbsent=true"
          alt="Action"
          className={styles.actionIcon}
        />
      </Button>
    </div>
  );
};

export default TrackItem;
