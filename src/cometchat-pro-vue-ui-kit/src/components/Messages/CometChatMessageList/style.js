export const chatListStyle = (theme) => {
  return {
    backgroundColor: `${theme.backgroundColor.white}`,
    zIndex: "1",
    width: "100%",
    flex: "1 1 0",
    order: "2",
    position: "relative",
  };
};

export const listWrapperStyle = () => {
  return {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowX: "hidden",
    overflowY: "scroll",
    position: "absolute",
    top: "0",
    transition: "background .3s ease-out .1s",
    width: "100%",
    zIndex: "100",
    paddingTop: "14px",
  };
};

export const actionMessageStyle = () => {
  return {
    padding: "8px 12px",
    marginBottom: "16px",
    textAlign: "center",
  };
};

export const actionMessageTextStyle = () => {
  return {
    fontSize: "13.5px",
    margin: "0",
    lineHeight: "20px",
  };
};

export const messageDateContainerStyle = () => {
  return {
    textAlign: "center",
    marginBottom: "16px",
  };
};

export const messageDateStyle = (theme) => {
  return {
    padding: "8px 12px",
    backgroundColor: `${theme.backgroundColor.secondary}`,
    color: `${theme.color.primary}`,
    borderRadius: "10px",
  };
};

export const decoratorMessageStyle = () => {
  return {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
  };
};

export const decoratorMessageTextStyle = (theme) => {
  return {
    margin: "0",
    height: "30px",
    color: `${theme.color.secondary}`,
    fontSize: "24px!important",
    fontWeight: "600",
  };
};

export const loadingMessageTextStyle = (theme) => {
  return {
    margin: "0",
    padding: "4px 24px 24px",
    textAlign: "center",
    color: `${theme.color.secondary}`,
    fontSize: "18px!important",
    fontWeight: "600",
  };
};
