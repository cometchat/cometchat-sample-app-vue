export const chatScreenStyle = (theme) => {
  return {
    display: "flex",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: `${theme.fontFamily}`,
    "--chat-screen-font-family": `${theme.fontFamily}`,
  };
};

export const chatScreenSidebarStyle = (theme, sidebarView) => {
  const sidebar = sidebarView
    ? {
        "--cometchat-chats-sidebar-left": "0",
        "--cometchat-chats-sidebar-box-shadow":
          "rgba(0, 0, 0, .4) -30px 0 30px 30px",
      }
    : {};

  return {
    width: "280px",
    borderRight: `1px solid ${theme.borderColor.primary}`,
    height: "100%",
    position: "relative",
    "--cometchat-chats-sidebar-left": "-100%",
    "--cometchat-chats-sidebar-bg": `${theme.backgroundColor.white}`,
    ...sidebar,
  };
};

export const chatScreenMainStyle = (threadMessageView, detailView) => {
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
    display: "flex",
    flexDirection: "column",
    height: "100%",
    order: "2",
    ...secondaryView,
  };
};

export const chatScreenSecondaryStyle = (theme, threadMessageView) => {
  return {
    float: "right",
    borderLeft: `1px solid ${theme.borderColor.primary}`,
    height: "100%",
    width: threadMessageView ? "400px" : "300px",
    display: "flex",
    flexDirection: "column",
    order: "3",
    "--chats-secondary-bg-color": `${theme.backgroundColor.white}`,
  };
};
