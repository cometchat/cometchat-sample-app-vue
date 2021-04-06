export const badgeStyle = (theme) => {
  return {
    display: "block",
    fontSize: "12px",
    width: "auto",
    height: "18px",
    borderRadius: "16px",
    backgroundColor: `${theme.backgroundColor.blue}`,
    color: `${theme.color.white}`,
    textAlign: "center",
    fontWeight: "700",
    lineHeight: "18px",
    marginLeft: "4px",
    padding: "0 9px",
    marginRight: "2px",
    opacity: "1",
    transition: "opacity .1s",
  };
};
