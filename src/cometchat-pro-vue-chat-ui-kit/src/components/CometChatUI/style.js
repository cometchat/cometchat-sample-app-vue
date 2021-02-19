export const unifiedStyle = (theme) => {
  return {
    display: "flex",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: `${theme.fontFamily}`,
    position: "relative",
    "--cometchat-unified-font-family": `${theme.fontFamily}`,
  };
};

export const unifiedSidebarStyle = (theme, viewSidebar) => {
  const sidebarView = viewSidebar
    ? {
        "--cometchat-unified-sidebar-left": "0",
        "--cometchat-unified-sidebar-box-shadow":
          "rgba(0, 0, 0, .4) -30px 0 30px 30px",
      }
    : {
        "--cometchat-unified-sidebar-left": "-100%",
      };

  return {
    width: "280px",
    borderRight: `1px solid ${theme.borderColor.primary}`,
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    // "> .contacts, .chats, .groups": {
    //   height: "calc(100% - 50px)",
    // },
    "--cometchat-unified-sidebar-bg-color": `${theme.backgroundColor.white}`,
    ...sidebarView,
  };
};

export const unifiedMainStyle = (threadmessageview, detailview) => {
  const secondaryView = threadmessageview
    ? {
        width: "calc(100% - 680px)",
      }
    : detailview
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

export const unifiedSecondaryStyle = (theme, threadmessageview) => {
  return {
    float: "right",
    borderLeft: `1px solid ${theme.borderColor.primary}`,
    height: "100%",
    width: threadmessageview ? "400px" : "300px",
    display: "flex",
    flexDirection: "column",
    order: "3",
    "--cometchat-unified-sidebar-bg-color": `${theme.backgroundColor.white}`,
  };
};

export const unifiedPlaceholderStyle = (theme) => {
  return {
    width: "100%",
    height: "100%",
    opacity: "0.4",
    display: "flex",
    fontSize: "22px",
    fontWeight: "700",
    alignItems: "center",
    justifyContent: "center",
    color: `${theme.color.primary}`,
  };
};
