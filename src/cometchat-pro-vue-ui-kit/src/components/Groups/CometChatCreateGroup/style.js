export const modalWrapperStyle = (theme, open) => {
  const show = open
    ? {
        display: "block",
      }
    : {};

  return {
    minWidth: "350px",
    minHeight: "350px",
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
    background: `url(${img}) center center/ 18px no-repeat`,
    cursor: "pointer",
  };
};

export const modalBodyStyle = () => {
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
    height: "90%",
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
    height: "calc(100% - 40px)",
    overflowY: "auto",
    display: "block",
  };
};

export const tableErrorStyle = () => {
  return {
    fontSize: "12px",
    color: "red",
    textAlign: "center",
    display: "block",
  };
};

export const tableButtonStyle = (theme) => {
  return {
    cursor: "pointer",
    padding: "10px 20px",
    backgroundColor: `${theme.backgroundColor.blue}`,
    borderRadius: "5px",
    color: `${theme.color.white}`,
    fontSize: "14px",
    outline: "0",
    border: "0",
  };
};

export const inputStyle = (theme) => {
  return {
    display: "block",
    width: "100%",
    border: "0",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    borderRadius: "8px",
    backgroundColor: `${theme.backgroundColor.grey}`,
    padding: "6px 8px 6px 30px",
    color: `${theme.color.helpText}`,
    fontSize: "15px",
  };
};
