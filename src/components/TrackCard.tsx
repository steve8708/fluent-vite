"use client";

import * as React from "react";
import { useTheme } from "../theme/ThemeProvider";
import TrackItem, { TrackItemProps } from "./TrackItem";
import styles from "./TrackCard.module.css";

export interface TrackCardProps {
  title: string;
  items: TrackItemProps[];
}

export const TrackCard: React.FC<TrackCardProps> = ({ title, items }) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";

  return (
    <div className={styles.sectionContainer}>
      <h3 className={`${styles.title} ${isDark ? styles.darkTitle : ""}`}>
        {title}
      </h3>
      <div
        className={`${styles.cardContainer} ${isDark ? styles.darkCardContainer : ""}`}
      >
        <div className={styles.card}>
          <div className={styles.contentLayout}>
            <div className={styles.trackItemsContainer}>
              {items.map((item, index) => (
                <TrackItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  count={item.count}
                  onClick={item.onClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
