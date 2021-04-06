export const messageActionStyle = (message, theme, name) => {
  const topPos = name ? { top: "0px" } : { top: "-20px" };
  const alignment =
    message.messageFrom === "receiver"
      ? { alignSelf: "flex-end" }
      : { alignSelf: "flex-start" };

  return {
    position: "absolute",
    zIndex: "1",
    display: "flex",
    listStyleType: "none",
    visibility: "hidden",
    padding: "0",
    margin: "0",
    height: "26px",
    border: `1px solid ${theme.borderColor.primary}`,
    backgroundColor: `${theme.backgroundColor.white}`,
    borderRadius: "4px",
    alignItems: "center",
    justifyContent: "center",
    ...alignment,
    ...topPos,
  };
};

export const actionGroupStyle = () => {
  return {
    display: "flex",
    position: "relative",
  };
};

export const groupButtonStyle = (img, type) => {
  let height = "18px";
  let width = "19px";

  const setPos = (w, h) => {
    height = h;
    width = w;
  };

  if (type === "reply") {
    setPos("16px", "15px");
  } else if (type === "edit") {
    setPos("16px", "16px");
  } else if (type === "delete") {
    setPos("14px", "16px");
  }

  return {
    width,
    height,
    outline: "0",
    border: "0",
    margin: "6px 4px",
    borderRadius: "4px",
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    position: "relative",
    background: `url(${img}) 0% 0% / cover no-repeat`,
  };
};
