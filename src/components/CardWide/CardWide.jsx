import React from "react";
import { useTheme } from "@fluentui/react";
import { getStyles } from "./CardWide.styles";

export const CardWide = ({
  showBarIcon = true,
  showButton = true,
  image,
  titleText,
  bodyText,
  buttonText = "Create a Passkey",
  imagePosition = "right",
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.container}>
      {showBarIcon && (
        <div className={styles.barIconContainer}>
          <div className={styles.severityRibbon}>
            <div />
          </div>
          <div className={styles.iconContainer}>
            <img src={image} className={styles.icon} alt="" />
          </div>
        </div>
      )}
      <div className={styles.card}>
        <div
          className={`${styles.contentLayout} ${imagePosition === "right" ? styles.flipped : ""}`}
        >
          <div className={styles.imageContainer}>
            <img src={image} className={styles.image} alt="" />
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.textContainer}>
              <h2>{titleText}</h2>
              <p>{bodyText}</p>
            </div>
            {showButton && (
              <div className={styles.button}>
                <div className={styles.buttonText}>{buttonText}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWide;
