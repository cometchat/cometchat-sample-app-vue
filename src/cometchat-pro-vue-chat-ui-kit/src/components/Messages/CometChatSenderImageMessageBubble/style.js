export const messageContainerStyle = () => {
  return {
    alignSelf: "flex-end",
    marginBottom: "16px",
    paddingLeft: "16px",
    paddingRight: "16px",
    maxWidth: "65%",
    clear: "both",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexShrink: "0",
  };
};

export const messageWrapperStyle = () => {
  return {
    width: "auto",
    flex: "1 1",
    alignSelf: "flex-end",
    display: "flex",
  };
};

export const messageImgWrapper = () => {
  return {
    display: "inline-block",
    alignSelf: "flex-end",
    maxWidth: "300px",
    height: "200px",
    cursor: "pointer",
    flexShrink: "0",
    width: "100%",
  };
};

export const messageImg = () => {
  return {
    borderRadius: "8px",
    height: "100%",
  };
};

export const messageInfoWrapperStyle = () => {
  return {
    alignSelf: "flex-end",
  };
};

export const messageActionWrapperStyle = (parentMessageId) => {
  const hoverStyle = parentMessageId
    ? {
        "--sender-image-message-bubble-hover-display": "visible",
      }
    : {};
  return {
    width: "auto",
    flex: "1 1",
    alignSelf: "flex-end",
    display: "flex",
    ...hoverStyle,
  };
};

export const messageReactionsWrapperStyle = () => {
  return {
    display: "inline-flex",
    alignSelf: "flex-end",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  };
};
