export const modalWrapperStyle = (theme, open) => {
  const show = open
    ? {
        display: "block",
      }
    : {};

  return {
    minWidth: "350px",
    minHeight: "450px",
    width: "50%",
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

export const modalBodyStyle = () => {
  return {
    overflow: "hidden auto",
    padding: "25px",
    height: "100%",
    width: "100%",
  };
};

export const modalErrorStyle = () => {
  return {
    fontSize: "12px",
    color: "red",
    textAlign: "center",
  };
};

export const modalTableStyle = () => {
  return {
    borderCollapse: "collapse",
    margin: "0",
    padding: "0",
    width: "100%",
    height: "90%",
  };
};

export const modalTableRowStyle = (theme) => {
  return {
    borderBottom: `1px solid ${theme.borderColor.primary}`,
    display: "table",
    width: "100%",
    tableLayout: "fixed",
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

export const tableBodyStyle = () => {
  return {
    height: "calc(100% - 64px)",
    minHeight: "250px",
    overflowY: "auto",
    display: "block",
  };
};

export const inputStyle = () => {
  return {
    width: "100%",
    border: "none",
    padding: "6px 12px",
    fontSize: "14px",
  };
};

export const tableFootStyle = () => {
  return {
    width: "100%",
    display: "inline-block",
  };
};

export const buttonStyle = (theme, loading) => {
  return {
    cursor: loading ? "default" : "pointer",
    padding: "10px 20px",
    backgroundColor: `${theme.backgroundColor.blue}`,
    borderRadius: "5px",
    color: `${theme.color.white}`,
    fontSize: "14px",
    outline: "0",
    border: "0",
  };
};

export const iconWrapperStyle = () => {
  return {
    width: "50px",
  };
};

export const addOptionIconStyle = (img) => {
  return {
    background: `url(${img}) right center / 24px no-repeat`,
    cursor: "pointer",
    display: "block",
    height: "28px",
    width: "28px",
  };
};
