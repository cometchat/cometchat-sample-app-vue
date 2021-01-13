export const previewWrapperStyle = (theme) => {
  return {
    padding: "8px",
    backgroundColor: `${theme.backgroundColor.white}`,
    border: `1px solid ${theme.borderColor.primary}`,
    fontSize: "13px",
    display: "flex",
    marginBottom: "-1px",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    position: "relative",
    borderRadius: "8px",
  };
};

export const previewHeadingStyle = () => {
  return {
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-around",
  };
};

export const previewCloseStyle = (img) => {
  return {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: `url(${img}) center center no-repeat`,
    cursor: "pointer",
  };
};

export const previewOptionsWrapperStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  };
};

export const previewOptionStyle = (theme) => {
  const color = "rgba(20, 20, 20, 0.02)";
  return {
    padding: "8px 10px",
    marginRight: "12px",
    backgroundColor: `${theme.backgroundColor.white}`,
    boxShadow: `0 0 0 1px ${color} , 0 1px 1px 0 ${color} , 0 2px 6px 0 ${color}`,
    border: `1px solid ${theme.borderColor.primary}`,
    borderRadius: "18px",
    cursor: "pointer",
  };
};
