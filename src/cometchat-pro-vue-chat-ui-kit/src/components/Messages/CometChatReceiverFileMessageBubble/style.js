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

export const messageFileContainerStyle = () => {
  return {
    width: "auto",
    flex: "1 1",
    alignSelf: "flex-start",
    display: "flex",
  };
};

export const messageFileWrapperStyle = (theme) => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    color: `${theme.color.secondary}`,
    backgroundColor: `${theme.backgroundColor.secondary}`,
    padding: "8px 12px",
    alignSelf: "flex-start",
    width: "auto",
  };
};

export const messageFileLinkStyle = (theme) => {
  return {
    background: "0 0",
    textDecoration: "none",
    color: `${theme.color.primary}`,
    maxWidth: "100%",
    fontSize: "14px",
    "--file-recieve-message-color": `${theme.color.primary}`,
    "--file-recieve-message-bg-color": `${theme.backgroundColor.white}`,
  };
};

export const messageFileLinkContainerStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
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
        "--receiver-file-message-bubble-hover-display": "hidden",
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
