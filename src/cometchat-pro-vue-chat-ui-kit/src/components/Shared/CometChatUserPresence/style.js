export const presenceStyle = (status) => {
  return {
    width: "9px",
    height: "9px",
    top: "-12px",
    float: "right",
    position: "relative",
    backgroundColor:
      status === "online" || status === "available"
        ? "rgb(0, 255, 0)"
        : "rgb(85, 85, 85)",
  };
};
