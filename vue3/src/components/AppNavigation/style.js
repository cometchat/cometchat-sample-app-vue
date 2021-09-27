export const wrapperStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    wordBreak: "break-word",
  };
};

export const titleStyle = () => {
  return {
    textAlign: "center",
    color: "rgb(67, 171, 255)",
    fontSize: "24px",
    width: "100%",
    marginBottom: "0",
  };
};

export const subTitleStyle = () => {
  return {
    textAlign: "center",
    color: "#AAA",
    fontSize: "14px",
    width: "100%",
    padding: "0 1em 24px 1em",
  };
};

export const helpTextStyle = () => {
  return {
    fontSize: "14px",
    textAlign: "center",
    width: "100%",
    color: "#333",
    padding: "0 1em",
  };
};

export const componentStyle = () => {
  return {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: "25px",
    paddingTop: "0px",
    width: "100%",
  };
};

export const boxStyle = () => {
  return {
    margin: "10px 20px",
    padding: "20px",
    boxShadow: "0 0 10px #bbb",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: "1",
    height: "100%",
    minWidth: "300px",
    maxWidth: "500px",
  };
};

export const titleWrapperStyle = () => {
  return {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  };
};

export const thumbnailWrapperStyle = () => {
  return {
    width: "36px",
    height: "36px",
  };
};

export const componentTitleStyle = () => {
  return {
    width: "calc(100% - 40px)",
    fontWeight: "700",
    padding: "10px",
    margin: "0",
  };
};

export const descWrapperStyle = () => {
  return {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  };
};

export const linkWrapperStyle = () => {
  return {
    borderTop: "0.3px solid #e8e8e8",
    padding: "16px",
    paddingBottom: "0px",
    display: "flex",
    margin: 0,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  };
};

export const linkStyle = () => {
  return {
    color: "rgb(67, 171, 255)!important",
    fontWeight: 600,
    fontSize: "14px",
  };
};

export const logoutBtn = () => {
  return {
    margin: "auto",
    padding: "32px",
    textAlign: "center",
    button: {
      outline: "none",
      backgroundColor: "#333",
      borderRadius: "10px",
      color: "white",
      padding: "10px 25px",
      cursor: "pointer",
    },
  };
};
