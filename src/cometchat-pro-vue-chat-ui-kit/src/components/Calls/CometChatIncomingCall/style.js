export const incomingCallWrapperStyle = (theme) => {
  let positionValue = "absolute";
  let leftPos = "0";
  let rightPos = "0";
  let topPos = "0";
  let bottomPos = "unset";
  let zIndexValue = "999";

  return {
    position: positionValue,
    top: topPos,
    left: leftPos,
    bottom: bottomPos,
    right: rightPos,
    borderRadius: "10px",
    margin: "15px",
    backgroundColor: `${theme.backgroundColor.callScreenGrey}`,
    zIndex: zIndexValue,
    color: `${theme.color.white}`,
    textAlign: "center",
    boxSizing: "border-box",
    fontFamily: `${theme.fontFamily}`,
    width: "250px",
    "--call-alert-font-family": `${theme.fontFamily}`,
  };
};

export const callContainerStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "15px",
  };
};

export const headerWrapperStyle = () => {
  return {
    width: "100%",
    display: "flex",
  };
};

export const callDetailStyle = () => {
  return {
    width: "calc(100% - 36px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
  };
};

export const nameStyle = () => {
  return {
    fontSize: "15px",
    fontWeight: "600",
    display: "block",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    lineHeight: "20px",
  };
};

export const callTypeStyle = () => {
  return {
    fontSize: "13px",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textTransform: "capitalize",
    lineHeight: "20px",
    color: "#8A8A8A",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    padding: "2px 0 0 0px",
    span: {
      padding: "0 5px",
    },
  };
};

export const thumbnailStyle = () => {
  return {
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
  };
};

export const headerButtonStyle = () => {
  return {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0 0 0",
  };
};

export const buttonStyle = (theme, action) => {
  const backgroundColor = action
    ? `${theme.backgroundColor.blue}`
    : `${theme.backgroundColor.red}`;

  return {
    cursor: "pointer",
    padding: "6px 20px",
    backgroundColor: backgroundColor,
    borderRadius: "5px",
    color: `${theme.color.white}`,
    fontSize: "14px",
    outline: "0",
    border: "0",
    width: "45%",
  };
};
