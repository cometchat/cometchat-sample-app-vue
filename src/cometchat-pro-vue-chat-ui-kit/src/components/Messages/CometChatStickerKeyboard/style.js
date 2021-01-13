export const stickerWrapperStyle = (theme) => {
  return {
    backgroundColor: `${theme.backgroundColor.grey}`,
    border: `1px solid ${theme.borderColor.primary}`,
    borderBottom: "none",
    borderRadius: "10px",
    overflow: "hidden",
    height: "215px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
};

export const stickerSectionListStyle = (theme) => {
  return {
    borderTop: `1px solid ${theme.borderColor.primary}`,
    backgroundColor: `${theme.backgroundColor.silver}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "uppercase",
    overflowX: "auto",
    overflowY: "hidden",
    padding: "10px",
    // "::-webkit-scrollbar": {
    //   background: `${theme.backgroundColor.primary}`,
    // },
    // "::-webkit-scrollbar-thumb": {
    //   background: `${theme.backgroundColor.silver}`,
    // },
  };
};

export const sectionListItemStyle = (theme) => {
  return {
    height: "35px",
    width: "35px",
    cursor: "pointer",
    flexShrink: "0",
    padding: "3px",
    "--sticker-set-active-color": theme.color.blue,
  };
};

export const stickerListStyle = () => {
  return {
    height: "calc(100% - 50px)",
    display: "flex",
    overflowX: "hidden",
    overflowY: "auto",
    flexWrap: "wrap",
    padding: "12px 0px",
    justifyContent: "space-around",
    alignItems: "center",
  };
};

export const stickerItemStyle = () => {
  return {
    minWidth: "50px",
    minHeight: "50px",
    maxWidth: "70px",
    maxHeight: "70px",
    cursor: "pointer",
    flexShrink: "0",
    marginRight: "20px",
  };
};

export const stickerMsgStyle = () => {
  return {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "35%",
  };
};

export const stickerMsgTextStyle = (theme) => {
  return {
    margin: "0",
    height: "30px",
    color: `${theme.color.secondary}`,
    fontSize: "24px!important",
    fontWeight: "600",
  };
};

export const stickerCloseStyle = (img) => {
  return {
    position: "absolute",
    top: "20px",
    right: "24px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: `url(${img}) center center no-repeat`,
    cursor: "pointer",
  };
};
