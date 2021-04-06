export const messageReactionsStyle = (theme, reactionData, loggedInUser) => {
  const uid = loggedInUser.uid;
  let borderStyle = {};
  let hoveredBorderStyle = {};

  if (Object.hasOwnProperty.call(reactionData, uid)) {
    borderStyle = {
      border: `1px solid ${theme.borderColor.blue}`,
    };

    hoveredBorderStyle = {
      "--reaction-hover-border": borderStyle.border,
    };
  } else {
    borderStyle = {
      border: "1px solid transparent",
    };

    hoveredBorderStyle = {
      "--reaction-hover-border": `1px solid ${theme.borderColor.primary}`,
    };
  }

  return {
    height: "24px",
    fontSize: "11px",
    paddingRight: "4px",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    backgroundColor: `${theme.backgroundColor.secondary}`,
    borderRadius: "12px",
    margin: "4px 4px 0 0",
    cursor: "pointer",
    ...borderStyle,
    ...hoveredBorderStyle,
  };
};

export const emojiButtonStyle = (img) => {
  return {
    outline: "0",
    border: "0",
    paddingLeft: "8px",
    borderRadius: "4px",
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    position: "relative",
    span: {
      height: "18px",
      width: "18px",
      background: `url(${img}) center center / 18px 18px no-repeat`,
    },
  };
};

export const reactionCountStyle = (theme) => {
  return {
    color: `${theme.color.primary}`,
    paddingRight: "4px",
  };
};

export const emojiPickerStyle = (messageFrom, bottom) => {
  const position =
    messageFrom === "sender" ? { right: "58px" } : { left: "0px" };

  return {
    zIndex: "2",
    width: "280px",
    bottom: `${bottom}px`,
    position: "absolute",
    ...position,
  };
};

export const emojiWrapperStyle = (messageFrom) => {
  return {
    position: "relative",
    textAlign: messageFrom === "sender" ? "right" : "left",
  };
};
