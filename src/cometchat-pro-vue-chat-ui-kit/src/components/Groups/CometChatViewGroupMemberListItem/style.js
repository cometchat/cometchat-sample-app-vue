export const tableRowStyle = (theme) => {
  return {
    border: `1px solid ${theme.borderColor.primary}`,
    borderTop: "none",
    display: "table",
    width: "100%",
    tableLayout: "fixed",
    fontSize: "14px",
  };
};

export const tableColumnStyle = () => {
  return {
    padding: "8px",
  };
};

export const avatarStyle = (participantView) => {
  const displayProp = participantView
    ? {
        "--members-avatar-display": "none",
      }
    : {};

  return {
    display: "inline-block",
    float: "left",
    width: "36px",
    height: "36px",
    ...displayProp,
  };
};

export const nameStyle = (participantView) => {
  const widthProp = participantView
    ? {
        "--members-name-width": "100%",
      }
    : {};

  return {
    margin: "10px 0",
    paddingLeft: "8px",
    width: "calc(100% - 50px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ...widthProp,
  };
};

export const roleStyle = () => {
  return {
    padding: "5px",
    float: "left",
    fontSize: "12px",
  };
};

export const scopeImageStyle = () => {
  return {
    width: "16px",
    height: "16px",
    cursor: "pointer",
    margin: "4px",
  };
};

export const actionColumnStyle = () => {
  return {
    width: "70px",
    padding: "8px",
    img: {
      width: "20px",
      height: "20px",
      cursor: "pointer",
    },
    kick: {
      width: "16px",
      height: "17px",
    },
  };
};

export const scopeWrapperStyle = () => {
  return {
    float: "left",
    width: "100%",
    transition: "opacity .1s linear",
    img: {
      width: "20px",
      height: "20px",
      margin: "4px",
      cursor: "pointer",
      float: "left",
    },
    clear: {
      width: "16px",
      height: "16px",
      margin: "6px 4px",
    },
  };
};

export const scopeSelectionStyle = () => {
  return {
    width: "65%",
    border: "0",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    borderRadius: "8px",
    backgroundColor: `rgba(20, 20, 20, 0.04)`,
    padding: "6px",
    color: `rgba(20, 20, 20, 0.6)`,
    float: "left",
  };
};
