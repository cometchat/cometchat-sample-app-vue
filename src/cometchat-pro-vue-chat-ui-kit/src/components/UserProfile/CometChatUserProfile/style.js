export const userInfoScreenStyle = (theme) => {
  return {
    display: "flex",
    flexDirection: "column!important",
    height: "calc(100% - 50px)",
    fontFamily: `${theme.fontFamily}`,
    "--cometchat-user-info-font-family": `${theme.fontFamily}`,
    "--info-item-bg-color-hover": `${theme.backgroundColor.primary}`,
  };
};

export const headerStyle = (theme) => {
  return {
    padding: "19px 16px",
    position: "relative",
    borderBottom: `1px solid ${theme.borderColor.primary}`,
  };
};

export const headerTitleStyle = () => {
  return {
    margin: "0",
    fontWeight: "700",
    fontSize: "22px",
  };
};

export const detailStyle = () => {
  return {
    padding: "19px 16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
  };
};

export const thumbnailStyle = () => {
  return {
    display: "inline-block",
    width: "36px",
    height: "36px",
    flexShrink: "0",
  };
};

export const userDetailStyle = () => {
  return {
    width: "calc(100% - 45px)",
    flexGrow: "1",
    paddingLeft: "15px",
  };
};

export const userNameStyle = () => {
  return {
    margin: "0",
    fontSize: "15px",
    fontWeight: "600",
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };
};

export const userStatusStyle = (theme) => {
  return {
    fontSize: "13px",
    margin: "0",
    color: `${theme.color.blue}`,
  };
};

export const optionsStyle = () => {
  return {
    height: "calc(100% - 142px)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "flex-start",
  };
};

export const optionTitleStyle = (theme) => {
  return {
    margin: "5px 0",
    width: "100%",
    opacity: "0.5",
    fontSize: "12px",
    fontWeight: "500",
    paddingLeft: "16px",
    color: `${theme.color.primmary}`,
    textTransform: "uppercase",
  };
};

export const optionListStyle = () => {
  return {
    paddingBottom: "16px",
    width: "100%",
    fontSize: "15px",
  };
};

export const optionStyle = (img) => {
  return {
    width: "100%",
    padding: "8px 16px 8px 58px",
    fontWeight: 600,
    cursor: "pointer",
    background: `url(${img}) 24px center no-repeat`,
  };
};

export const optionNameStyle = () => {
  return {
    width: "100%",
    marginTop: "10px",
  };
};

export const optionBorderStyle = (theme) => {
  return {
    borderBottom: `1px solid ${theme.borderColor.primary}`,
    marginTop: "10px",
  };
};
