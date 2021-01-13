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

export const messageFileWrapperStyle = (theme) => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    backgroundColor: `${theme.backgroundColor.blue}`,
    color: `${theme.color.white}`,
    padding: "8px 12px",
    alignSelf: "flex-end",
    maxWidth: "100%",
  };
};

export const messageFileLinkStyle = (theme) => {
  return {
    background: "0 0",
    textDecoration: "none",
    color: `${theme.color.white}`,
    maxWidth: "100%",
    fontSize: "14px",
    "--file-message-color": `${theme.color.white}`,
    "--file-message-bg-color": `${theme.backgroundColor.white}`,
  };
};

export const messageFileLinkContainerkStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
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
        "--sender-file-message-bubble-hover-display": "hidden",
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
