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

export const messageAudioWrapperStyle = () => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    alignSelf: "flex-end",
  };
};

export const messageAudioStyle = () => {
  return {
    maxWidth: "250px",
    display: "inherit",
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
        "--sender-audio-message-bubble-hover-display": "hidden",
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
