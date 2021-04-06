export const chatComposerStyle = (theme) => {
  return {
    padding: "14px 16px",
    backgroundColor: `${theme.backgroundColor.white}`,
    zIndex: "1",
    order: "3",
    position: "relative",
    flex: "none",
    minHeight: "105px",
  };
};

export const editPreviewContainerStyle = (theme) => {
  return {
    padding: "6px 7px",
    backgroundColor: `${theme.backgroundColor.white}`,
    borderColor: `${theme.borderColor.primary}`,
    borderWidth: "1px 1px 1px 5px",
    borderStyle: "solid",
    color: `${theme.color.helpText}`,
    fontSize: "13px",
    position: "relative",
    borderRadius: "8px",
    marginBottom: "-1px",
  };
};

export const previewHeadingStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
};

export const previewTextStyle = () => {
  return {
    padding: "5px 0",
  };
};

export const previewCloseStyle = (img) => {
  return {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: `url(${img}) center center no-repeat`,
    cursor: "pointer",
  };
};

export const composerInputStyle = () => {
  return {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
    zIndex: "2",
    padding: "0",
    minHeight: "85px",
  };
};

export const inputInnerStyle = (theme) => {
  return {
    flex: "1 1 auto",
    position: "relative",
    outline: "none",
    borderRadius: "8px",
    border: `1px solid ${theme.borderColor.primary}`,
    backgroundColor: `${theme.backgroundColor.white}`,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "85px",
  };
};

export const messageInputStyle = (disabled) => {
  const disabledState = disabled
    ? {
        pointerEvents: "none",
        opacity: "0.4",
      }
    : {};

  return {
    width: "100%",
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: "400",
    padding: "15px 10px",
    outline: "none",
    overflowX: "hidden",
    overflowY: "auto",
    position: "relative",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    zIndex: "1",
    minHeight: "50px",
    maxHeight: "100px",
    userSelect: "text",
    ...disabledState,
  };
};

export const inputStickyStyle = (theme) => {
  return {
    padding: "7px 10px",
    height: "35px",
    borderTop: `1px solid ${theme.borderColor.primary}`,
    backgroundColor: `${theme.backgroundColor.grey}`,
    display: "flex",
    justifyContent: "flex-end",
  };
};

export const stickyAttachmentStyle = () => {
  return {
    display: "flex",
    width: "calc(100% - 50px)",
  };
};

export const attachmentIconStyle = (img, showFilePicker, isBlockedByMe) => {
  const active = !showFilePicker
    ? { transform: "rotate(0deg)" }
    : { transform: "rotate(45deg)" };

  return {
    display: "inline-block",
    width: "20px",
    height: "20px",
    opacity: isBlockedByMe ? 0.4 : 1,
    transition: "transform 0.25s linear",
    background: `url(${img}) center center no-repeat`,
    cursor: isBlockedByMe ? "default" : "pointer",
    ...active,
  };
};

export const filePickerStyle = () => {
  return {
    left: "0",
    bottom: "0",
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    zIndex: "1",
    margin: "0 8px",
    textAlign: "center",
  };
};

export const fileListStyle = (showFilePicker) => {
  const active = showFilePicker
    ? { transform: "translate(0%)" }
    : { transform: "translate(-125%)" };

  return {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    transition: "transform 0.4s linear",
    ...active,
  };
};

export const fileItemStyle = (type, img) => {
  let width = "21px";
  let pos = "0%";

  const setPos = (w, p) => {
    width = w;
    pos = p;
  };

  if (type === "video") {
    setPos("22px", "2px");
  } else if (type === "audio") {
    setPos("21px", "2px");
  } else if (type === "image") {
    setPos("21px", "1px");
  } else if (type === "doc") {
    setPos("14px", "1px");
  } else if (type === "poll") {
    setPos("19px", "2px");
  }

  return {
    width,
    height: "21px",
    margin: "0px 5px",
    cursor: "pointer",
    background: `url(${img}) 0% ${pos} / cover no-repeat`,
  };
};

export const stickyButtonStyle = () => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };
};

export const emojiPickerStyle = () => {
  return {
    position: "absolute",
    bottom: "24px",
    right: "56px",
    zIndex: "2",
    width: "280px",
  };
};

export const loaderStyle = (theme, isLoading) => {
  return {
    height: "1px",
    "--loader-background-color-2": `${theme.backgroundColor.white}`,
    "--loader-background-color-1": isLoading
      ? `${theme.backgroundColor.blue}`
      : `${theme.backgroundColor.white}`,
  };
};

export const blockedBoxStyle = (theme) => {
  return {
    padding: "10px",
    textAlign: "center",
    borderRadius: "8px",
    marginBottom: "8px",
    background: "#85BAFF",
    color: theme.color.white,
    p: {
      margin: "0px",
      fontSize: "20px",
      fontWeight: "bold",
      paddingBottom: "4px",
    },
    span: {
      opacity: 0.8,
      fontSize: "13px",
    },
  };
};

export const composerIconStyle = (isBlockedByMe) => {
  return {
    width: "31px",
    height: "20px",
    paddingLeft: "10px",
    opacity: isBlockedByMe ? 0.4 : 1,
    img: {
      width: "21px",
      height: "20px",
      display: "inline-block",
      cursor: isBlockedByMe ? "default" : "pointer",
    },
  };
};
