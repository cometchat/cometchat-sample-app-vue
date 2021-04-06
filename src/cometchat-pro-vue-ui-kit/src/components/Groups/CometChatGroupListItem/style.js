export const listItemStyle = (theme, group, selectedGroup) => {
  const selectedState =
    selectedGroup && selectedGroup.guid === group.guid
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
    "--group-item-bg-color-hover": `${theme.backgroundColor.primary}`,
  };
};

export const listItemIconStyle = () => {
  return {
    width: "auto",
    height: "13px",
    margin: "0 6px",
    marginTop: "-1px",
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
    width: "calc(100% - 70px)",
    flexGrow: "1",
    paddingLeft: "15px",
  };
};

export const itemNameStyle = () => {
  return {
    maxWidth: "calc(100% - 30px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    margin: "0",
  };
};

export const itemNameWrapperStyle = () => {
  return {
    fontSize: "15px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "0",
  };
};

export const itemDescriptionStyle = (theme) => {
  return {
    borderBottom: `1px solid ${theme.borderColor.primary}`,
    color: `${theme.color.helpText}`,
    padding: "0 0 5px 0",
    fontSize: "12px",
  };
};
