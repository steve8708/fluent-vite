import { mergeStyleSets } from "@fluentui/react";

export const getStyles = (theme) => {
  return mergeStyleSets({
    container: {
      display: "flex",
      alignItems: "stretch",
      boxShadow:
        "0px 0.3px 0.9px 0px rgba(0, 0, 0, 0.10), 0px 1.6px 3.6px 0px rgba(0, 0, 0, 0.13)",
      gap: "-4px",
      justifyContent: "start",
      flexWrap: "wrap",
      height: "221px",
    },
    barIconContainer: {
      alignItems: "stretch",
      borderRadius: "4px",
      background: theme.palette.neutralLighter,
      display: "flex",
      gap: "-4px",
      justifyContent: "start",
      height: "100%",
    },
    severityRibbon: {
      width: "4px",
      alignSelf: "stretch",
      "& > div": {
        borderRadius: "4px",
        backgroundColor: "rgba(222, 89, 11, 1)",
        display: "flex",
        flexShrink: "0",
        height: "100%",
      },
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      background: theme.palette.warningBackground,
      display: "flex",
      paddingLeft: "24px",
      paddingRight: "24px",
      gap: "8px",
      height: "100%",
      width: "68px",
      "@media (max-width: 991px)": {
        paddingLeft: "20px",
        paddingRight: "20px",
      },
    },
    icon: {
      aspectRatio: "1",
      objectFit: "contain",
      objectPosition: "center",
      width: "20px",
    },
    card: {
      borderRadius: "4px",
      background: theme.palette.white,
      alignSelf: "stretch",
      minWidth: "240px",
      minHeight: "221px",
      padding: "16px 16px 34px",
      flex: "1",
      flexShrink: "1",
      flexBasis: "0%",
      "@media (max-width: 991px)": {
        maxWidth: "100%",
      },
    },
    contentLayout: {
      display: "flex",
      width: "100%",
      alignItems: "start",
      gap: "16px",
      justifyContent: "start",
    },
    imageContainer: {
      overflow: "hidden",
      width: "189px",
    },
    image: {
      aspectRatio: "1.1",
      objectFit: "contain",
      objectPosition: "center",
      width: "189px",
    },
    contentContainer: {
      display: "flex",
      height: "171px",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "start",
      flex: "1",
      flexShrink: "1",
      flexBasis: "0%",
    },
    textContainer: {
      width: "100%",
      minHeight: "44px",
      textAlign: "left",
      "& h2": {
        textAlign: "left",
        marginBottom: "8px",
      },
      "& p": {
        textAlign: "left",
      },
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4px",
      border: `1px solid ${theme.palette.neutralTertiary}`,
      background: theme.palette.white,
      alignSelf: "flex-start",
      display: "flex",
      marginTop: "36px",
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "1",
      padding: "8px 16px",
    },
    buttonText: {
      alignSelf: "stretch",
      paddingBottom: "2px",
      marginTop: "auto",
      marginBottom: "auto",
      gap: "4px",
    },
    flipped: {
      flexDirection: "row-reverse",
    },
  });
};
