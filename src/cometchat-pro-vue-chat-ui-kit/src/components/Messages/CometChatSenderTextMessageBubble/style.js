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

export const messageTextWrapperStyle = (theme) => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    backgroundColor: `${theme.backgroundColor.blue}`,
    color: `${theme.color.white}`,
    padding: "8px 12px",
    alignSelf: "flex-end",
    width: "auto",
  };
};

export const messagePreviewContainerStyle = (theme) => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: `${theme.backgroundColor.white}`,
    boxShadow: "0px 1px 2px 1px rgba(0,0,0,0.18)",
    alignSelf: "flex-start",
    width: "auto",
    maxWidth: "400px",
  };
};

export const messagePreviewWrapperStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    img: {
      minHeight: "150px",
    },
  };
};

export const previewDataStyle = (theme) => {
  return {
    borderTop: `1px solid  ${theme.borderColor.primary}`,
    borderBottom: `1px solid  ${theme.borderColor.primary}`,
    padding: "12px",
  };
};

export const previewTitleStyle = (theme) => {
  return {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textAlign: "left",
    width: "auto",
    color: `${theme.color.helpText}`,
    fontWeight: "700",
    marginBottom: "8px",
  };
};

export const previewDescStyle = (theme) => {
  return {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textAlign: "left",
    width: "auto",
    color: `${theme.color.helpText}`,
    fontStyle: "italic",
    fontSize: "13px",
  };
};

export const previewTextStyle = (theme) => {
  return {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textAlign: "left",
    width: "auto",
    textWrapper: {
      backgroundColor: "transparent",
      color: `${theme.color.helpText}`,
      fontStyle: "normal",
      padding: "8px 0",
    },
  };
};

export const previewLinkStyle = (theme) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    a: {
      display: "inline-block",
      color: `${theme.color.blue}`,
      fontWeight: "700",
    },
  };
};

export const messageTextStyle = (
  theme,
  parsedMessage,
  emojiMessage,
  showVariation
) => {
  let emojiAlignmentProp = {
    " > img": {
      width: "24px",
      height: "24px",
      display: "inline-block",
      verticalAlign: "top",
      zoom: "1",
      margin: "0 2px",
    },
  };

  let emojiProp = {};

  if (
    parsedMessage.length === emojiMessage.length &&
    emojiMessage.length === 1
  ) {
    emojiProp = {
      "> img": {
        width: "48px",
        height: "48px",
      },
    };
  } else if (
    parsedMessage.length === emojiMessage.length &&
    emojiMessage.length === 2
  ) {
    emojiProp = {
      "> img": {
        width: "36px",
        height: "36px",
      },
    };
  } else if (
    parsedMessage.length === emojiMessage.length &&
    emojiMessage.length > 2
  ) {
    emojiProp = {
      "> img": {
        width: "24px",
        height: "24px",
      },
    };
  }

  if (showVariation === false) {
    emojiProp = {
      "> img": {
        width: "24px",
        height: "24px",
      },
    };
  }

  return {
    margin: "0",
    fontSize: "13px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textAlign: "left",
    width: "auto",
    " a": {
      color: "#0432FF",
      "&:hover": {
        color: "#04009D",
      },
    },
    " a[href^='mailto:']": {
      color: "#F38C00",
      "&:hover": {
        color: "#F36800",
      },
    },
    " a[href^='tel:']": {
      color: "#3802DA",
      "&:hover": {
        color: "#2D038F",
      },
    },
    ...emojiAlignmentProp,
    ...emojiProp,
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
        "--sender-message-bubble-hover-display": "hidden",
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
