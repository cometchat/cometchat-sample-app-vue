export const groupScreenStyle = (theme) => {
  return {
    display: "flex",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: `${theme.fontFamily}`,
    "--cometchat-font-family": `${theme.fontFamily}`,
  };
};

export const groupScreenSidebarStyle = (theme, sidebarView) => {
  const sidebar = sidebarView
    ? {
        "--cometchat-groups-sidebar-left": "0",
        "--cometchat-groups-sidebar-box-shadow":
          "rgba(0, 0, 0, .4) -30px 0 30px 30px",
      }
    : {};

  return {
    width: "280px",
    borderRight: `1px solid ${theme.borderColor.primary}`,
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    "--cometchat-groups-sidebar-left": "-100%",
    "--cometchat-groups-sidebar-bg": `${theme.backgroundColor.white}`,
    ...sidebar,
  };
};

export const groupScreenMainStyle = (threadMessageView, detailView) => {
  const secondaryView = threadMessageView
    ? {
        width: "calc(100% - 680px)",
      }
    : detailView
    ? {
        width: "calc(100% - 580px)",
      }
    : {};

  return {
    width: "calc(100% - 280px)",
    height: "100%",
    order: "2",
    ...secondaryView,
  };
};

export const groupScreenSecondaryStyle = (theme, threadMessageView) => {
  return {
    float: "right",
    borderLeft: `1px solid ${theme.borderColor.primary}`,
    height: "100%",
    width: threadMessageView ? "400px" : "300px",
    display: "flex",
    flexDirection: "column",
    order: "3",
    "--groups-secondary-bg-color": `${theme.backgroundColor.white}`,
  };
};
