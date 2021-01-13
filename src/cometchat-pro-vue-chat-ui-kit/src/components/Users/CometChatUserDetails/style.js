export const userDetailStyle = (theme) => {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    fontFamily: `${theme.fontFamily}`,
    "--detailpane-font-family": `${theme.fontFamily}`,
  };
};

export const headerStyle = (theme) => {
  return {
    padding: "19px 16px",
    position: "relative",
    borderBottom: `1px solid ${theme.borderColor.primary}`,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  };
};

export const headerCloseStyle = (img) => {
  return {
    cursor: "pointer",
    display: "none",
    background: `url(${img}) center center no-repeat`,
    width: "24px",
    height: "24px",
    marginRight: "12px",
  };
};

export const headerTitleStyle = () => {
  return {
    margin: "0",
    fontWeight: "700",
    fontSize: "20px",
  };
};

export const sectionStyle = () => {
  return {
    margin: "0",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "calc(100% - 70px)",
    "&:not(:last-of-type)": {
      marginBottom: "16px",
    },
  };
};

export const privacySectionStyle = (theme) => {
  return {
    width: "100%",
    "--privacy-color-red": `${theme.color.red}`,
  };
};

export const sectionHeaderStyle = (theme) => {
  return {
    margin: "0",
    width: "100%",
    fontSize: "12px",
    fontWeight: "500!important",
    lineHeight: "20px",
    color: `${theme.color.secondary}`,
    textTransform: "uppercase",
  };
};

export const sectionContentStyle = () => {
  return {
    width: "100%",
    margin: "6px 0",
  };
};

export const contentItemStyle = () => {
  return {
    width: "100%",
    "&:not(:first-of-type):not(:last-of-type)": {
      padding: "6px 0",
    },
  };
};

export const itemLinkStyle = (deleteLink, theme) => {
  const deleteCss = deleteLink
    ? {
        color: `${theme.color.red}`,
      }
    : {};

  return {
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: "600",
    display: "inline-block",
    ...deleteCss,
  };
};
