export const messageContainerStyle = () => {
  return {
    alignSelf: "flex-start",
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
    alignSelf: "flex-start",
    display: "flex",
  };
};

export const messageThumbnailStyle = () => {
  return {
    width: "36px",
    height: "36px",
    margin: "10px 5px",
    float: "left",
    flexShrink: "0",
  };
};

export const messageDetailStyle = () => {
  return {
    flex: "1 1",
    display: "flex",
    flexDirection: "column",
  };
};

export const nameWrapperStyle = (avatar) => {
  const paddingValue = avatar
    ? {
        padding: "3px 5px",
      }
    : {};

  return {
    alignSelf: "flex-start",
    ...paddingValue,
  };
};

export const nameStyle = (theme) => {
  return {
    fontSize: "10px",
    color: `${theme.color.helpText}`,
  };
};

export const messageAudioContainerStyle = () => {
  return {
    width: "auto",
    flex: "1 1",
    alignSelf: "flex-start",
    display: "flex",
  };
};

export const messageAudioWrapperStyle = () => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    alignSelf: "flex-start",
  };
};

export const messageAudioStyle = () => {
  return {
    maxWidth: "250px",
    display: "inherit",
    outline: "none",
  };
};

export const messageInfoWrapperStyle = () => {
  return {
    alignSelf: "flex-start",
    padding: "3px 5px",
  };
};

export const messageTimestampStyle = (theme) => {
  return {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "500",
    lineHeight: "12px",
    textTransform: "uppercase",
    color: `${theme.color.helpText}`,
  };
};

export const messageActionWrapperStyle = (parentMessageId) => {
  const hoverStyle = parentMessageId
    ? {
        "--receiver-message-audio-bubble-hover-display": "hidden",
      }
    : {};

  return {
    width: "auto",
    flex: "1 1",
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row-reverse",
    ...hoverStyle,
  };
};

export const messageReactionsWrapperStyle = () => {
  return {
    display: "inline-flex",
    alignSelf: "flex-start",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  };
};
