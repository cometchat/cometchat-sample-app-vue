export const tableRowStyle = (theme) => {
  return {
    border: `1px solid ${theme.borderColor.primary}`,
    borderTop: "none",
    display: "table",
    width: "100%",
    tableLayout: "fixed",
    fontSize: "14px",
    td: {
      padding: ".625em",
    },
  };
};

export const avatarStyle = () => {
  return {
    display: "inline-block",
    float: "left",
    width: "36px",
    height: "36px",
    marginRight: "8px",
    span: {
      top: "26px",
      left: "-8px",
    },
  };
};

export const nameStyle = () => {
  return {
    margin: "10px",
    width: "calc(100% - 50px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };
};

export const roleStyle = () => {
  return {
    width: "150px",
    fontSize: "12px",
  };
};

export const actionStyle = () => {
  return {
    width: "70px",
    img: {
      width: "20px!important",
      height: "20px!important",
      cursor: "pointer",
    },
  };
};
