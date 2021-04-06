export const listItemStyle = (theme, user, selectedUser) => {
  const selectedState =
    selectedUser && selectedUser.uid === user.uid
      ? {
          backgroundColor: `${theme.backgroundColor.primary}`,
        }
      : {};

  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    padding: "10px 20px",
    ...selectedState,
    "--list-item-bg-color-hover": `${theme.backgroundColor.primary}`,
  };
};

export const itemThumbnailStyle = () => {
  return {
    display: "inline-block",
    width: "36px",
    height: "36px",
    flexShrink: "0",
  };
};

export const itemDetailStyle = () => {
  return {
    width: "calc(100% - 45px)",
    flexGrow: 1,
    paddingLeft: "15px",
  };
};

export const itemNameStyle = () => {
  return {
    fontSize: "15px",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
    margin: "5px 0 0 0",
  };
};

export const itemDescriptionStyle = (theme) => {
  return {
    marginTop: "10px",
    borderBottom: `1px solid ${theme.borderColor.primary}`,
  };
};
