export const modalWrapperStyle = (theme, open) => {
  const show = open
    ? {
        display: "block",
      }
    : {};

  return {
    minWidth: "350px",
    minHeight: "450px",
    width: "40%",
    height: "40%",
    overflow: "hidden",
    backgroundColor: `${theme.backgroundColor.white}`,
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1002",
    margin: "0 auto",
    boxShadow:
      "rgba(20, 20, 20, 0.2) 0 16px 32px, rgba(20, 20, 20, 0.04) 0 0 0 1px",
    borderRadius: "12px",
    display: "none",
    ...show,
  };
};

export const modalCloseStyle = (img) => {
  return {
    position: "absolute",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    top: "20px",
    right: "16px",
    background: `url(${img}) center center / 18px no-repeat`,
    cursor: "pointer",
  };
};

export const modalBodyCtyle = () => {
  return {
    padding: "25px",
    height: "100%",
    width: "100%",
  };
};

export const modalTableStyle = () => {
  return {
    borderCollapse: "collapse",
    margin: "0",
    padding: "0",
    width: "100%",
    height: "80%",
  };
};

export const tableCaptionStyle = () => {
  return {
    fontSize: "20px",
    marginBottom: "15px",
    fontWeight: "bold",
    textAlign: "left",
  };
};

export const tableSearchStyle = () => {
  return {
    fontWeight: "normal",
    marginBottom: "15px",
  };
};

export const searchInputStyle = (theme, img) => {
  return {
    width: "100%",
    border: "0",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    borderRadius: "8px",
    padding: "6px 8px 6px 35px",
    fontSize: "15px",
    outline: "none",
    color: `${theme.color.primary}`,
    background: `url(${img}) 10px center / 16px no-repeat ${theme.backgroundColor.grey}`,
  };
};

export const tableBodyStyle = (theme) => {
  return {
    height: "100%",
    overflowY: "auto",
    display: "block",
    tr: {
      border: `1px solid ${theme.borderColor.primary}`,
      display: "table",
      width: "100%",
      tableLayout: "fixed",
    },
  };
};

export const tableFootStyle = (theme) => {
  return {
    button: {
      cursor: "pointer",
      padding: "10px 20px",
      backgroundColor: `${theme.backgroundColor.blue}`,
      borderRadius: "5px",
      color: `${theme.color.white}`,
      fontSize: "14px",
      outline: "0",
      border: "0",
    },
    tr: {
      border: "none",
    },
    td: {
      textAlign: "center",
    },
  };
};

export const contactMsgStyle = () => {
  return {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "55%",
  };
};

export const contactMsgTxtStyle = (theme) => {
  return {
    margin: "0",
    height: "30px",
    color: `${theme.color.secondary}`,
    fontSize: "24px!important",
    fontWeight: "600",
  };
};
