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

export const messageTextContainerStyle = () => {
  return {
    width: "auto",
    flex: "1 1",
    alignSelf: "flex-start",
    display: "flex",
  };
};

export const messageTextWrapperStyle = (theme) => {
  return {
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
    backgroundColor: `${theme.backgroundColor.secondary}`,
    padding: "8px 12px",
    alignSelf: "flex-start",
    width: "100%",
  };
};

export const pollQuestionStyle = () => {
  return {
    margin: "0",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    textAlign: "left",
    width: "100%",
    fontSize: "14px",
  };
};

export const pollAnswerStyle = (theme) => {
  return {
    listStyleType: "none",
    padding: "0",
    margin: "0",
    li: {
      backgroundColor: `${theme.backgroundColor.white}`,
      margin: "10px 0",
      borderRadius: "8px",
      display: "flex",
      width: "100%",
      cursor: "pointer",
      position: "relative",
    },
  };
};

export const pollTotalStyle = () => {
  return {
    fontSize: "13px",
    margin: "0",
    alignSelf: "flex-end",
  };
};

export const pollPercentStyle = (theme, width) => {
  const curvedBorders =
    width === "100%"
      ? { borderRadius: "8px" }
      : {
          borderRadius: "8px 0 0 8px",
        };

  return {
    maxWidth: "100%",
    width: width,
    ...curvedBorders,
    backgroundColor: `${theme.backgroundColor.primary}`,
    minHeight: "35px",
    height: "100%",
    position: "absolute",
    zIndex: "1",
  };
};

export const answerWrapperStyle = (theme, loggedInUser, optionData, img) => {
  let bgImg = {};
  let textPadding = "6px 12px";
  let countPadding = textPadding;
  if (
    Object.prototype.hasOwnProperty.call(optionData, "voters") &&
    Object.prototype.hasOwnProperty.call(optionData.voters, loggedInUser.uid)
  ) {
    bgImg = {
      background: `url(${img}) no-repeat calc(100% - 6px) center`,
    };
    textPadding = "6px 40px 6px 12px";
  }

  return {
    width: "100%",
    color: `${theme.color.primary}`,
    display: "flex",
    alignItems: "center",
    minHeight: "35px",
    height: "100%",
    ...bgImg,
    zIndex: "2",
    p: {
      margin: "0",
      padding: textPadding,
      width: "calc(100% - 40px)",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      fontSize: "14px",
    },
    span: {
      width: "40px",
      padding: countPadding,
      fontWeight: "bold",
      display: "inline-block",
      fontSize: "13px",
    },
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
        "--receiver-message-poll-bubble-hover-display": "hidden",
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
