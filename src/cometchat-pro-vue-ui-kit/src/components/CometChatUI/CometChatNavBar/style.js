export const footerStyle = () => {
  return {
    width: "100%",
    zIndex: "1",
  };
};

export const navbarStyle = () => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  };
};

export const itemStyle = () => {
  return {
    display: "inline-block",
    padding: "13px",
    cursor: "pointer",
  };
};

export const itemLinkStyle = (icon, activeStateIcon, isActive, isGroup) => {
  let background = isActive
    ? {
        background: `url(${activeStateIcon}) 0% 0% / contain no-repeat`,
      }
    : {
        background: `url(${icon}) 0% 0% / contain no-repeat`,
      };

  return {
    height: "20px",
    display: "inline-block",
    width: isGroup ? "28px" : "21px",
    ...background,
  };
};
