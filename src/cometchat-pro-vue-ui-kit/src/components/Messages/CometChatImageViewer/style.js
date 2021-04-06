export const imageWrapperStyle = (img) => {
  return {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    padding: "2%",
    zIndex: "9999",
    display: "flex",
    justifyContent: "center",
    background: `url(${img}) calc(100% - 4px) 4px no-repeat #fff`,
    cursor: "pointer",
  };
};

export const imageStyle = () => {
  return {
    objectFit: "contain",
  };
};
