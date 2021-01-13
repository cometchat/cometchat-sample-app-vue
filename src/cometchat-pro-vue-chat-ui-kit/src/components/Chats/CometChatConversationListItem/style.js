export const listItem = (theme, conversation, selectedConversation) => {
  const selectedState =
    conversation &&
    selectedConversation &&
    selectedConversation.conversationId === conversation.conversationId
      ? {
          backgroundColor: `${theme.backgroundColor.primary}`,
        }
      : {};

  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    padding: "10px 20px",
    ...selectedState,
    "--chat-item-bg-color-hover": `${theme.backgroundColor.primary}`,
  };
};

export const itemThumbnailStyle = () => {
  return {
    display: "inline-block",
    width: "36px",
    height: "36px",
    flexShrink: "0",
  };
};

export const itemDetailStyle = () => {
  return {
    width: "calc(100% - 45px)",
    flexGrow: "1",
    paddingLeft: "15px",
  };
};

export const itemRowStyle = () => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  };
};

export const itemNameStyle = () => {
  return {
    fontSize: "15px",
    fontWeight: "600",
    display: "block",
    width: "calc(100% - 60px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };
};

export const itemLastMsgStyle = (theme) => {
  return {
    margin: "0",
    fontSize: "13px",
    width: "calc(100% - 50px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    lineHeight: "20px",
    color: `${theme.color.helpText}`,
  };
};

export const itemLastMsgTimeStyle = (theme) => {
  return {
    fontSize: "11px",
    textTransform: "uppercase",
    color: `${theme.color.helpText}`,
  };
};
