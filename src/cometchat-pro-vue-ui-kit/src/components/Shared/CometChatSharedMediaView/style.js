export const sectionStyle = (containerHeight) => {
  const containerHeightProp = containerHeight
    ? {
        height: `calc(100% - ${containerHeight})`,
      }
    : {
        height: "calc(100% - 20px)",
      };

  return {
    width: "100%",
    marginTop: "8px",
    ...containerHeightProp,
  };
};

export const sectionHeaderStyle = (theme) => {
  return {
    margin: "0",
    width: "100%",
    fontSize: "12px",
    fontWeight: "500!important",
    lineHeight: "20px",
    color: `${theme.color.secondary}`,
    textTransform: "uppercase",
  };
};

export const messageStyle = (theme) => {
  return {
    width: "100%",
    textAlign: "center",
    padding: "32px 8px",
    color: `${theme.color.primary}`,
  };
};

export const sectionContentStyle = () => {
  return {
    width: "100%",
    margin: "6px 0",
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 20px)",
  };
};

export const mediaBtnStyle = () => {
  return {
    borderRadius: "8px",
    backgroundColor: "rgba(20, 20, 20, 0.08)",
    width: "100%",
    padding: "2px",
    margin: "6px 0",
    clear: "both",
  };
};

export const buttonStyle = (messageType, type) => {
  const activeBtn =
    messageType === type
      ? {
          backgroundColor: "#fff",
          boxShadow:
            "rgba(20, 20, 20, 0.04) 0 3px 1px, rgba(20, 20, 20, 0.12) 0 3px 8px",
          borderRadius: "7px",
          "--button-before-display": "none",
        }
      : {};

  return {
    display: "inline-block",
    width: "33.33%",
    float: "left",
    fontSize: "13px",
    fontWeight: "500",
    lineHeight: "18px",
    padding: "5px",
    position: "relative",
    textAlign: "center",
    cursor: "pointer",
    "--button-before-display": "block",
    ...activeBtn,
  };
};

export const mediaItemStyle = () => {
  return {
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "14px",
    margin: "0px -4px",
  };
};

export const itemStyle = (messageType, theme, img) => {
  let itemTypeStyle = {};
  let bgColor = `${theme.backgroundColor.lightGrey}`;

  if (messageType === "image") {
    itemTypeStyle = {
      height: "120px",
      width: "120px",
      backgroundColor: bgColor,
      image: {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "contain",
      },
    };
  } else if (messageType === "video") {
    itemTypeStyle = {
      video: {
        height: "120px",
        width: "120px",
        margin: "auto",
      },
    };
  } else if (messageType === "file") {
    itemTypeStyle = {
      backgroundColor: bgColor,
      anchor: {
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto",
        backgroundColor: bgColor,
        display: "inline-block",
        padding: "10px",
        paddingLeft: "35px",
        fontSize: "13px",
        color: `${theme.color.primary}`,
        background: `url(${img}) no-repeat 10px center`,
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        textAlign: "left",
        "--file-hover-color": `${theme.color.primary}`,
      },
    };
  }

  return {
    margin: "0.5rem",
    textAlign: "center",
    flex: "1 0 auto",
    ...itemTypeStyle,
    // "@for $i from 1 through 36": {
    //   "&:nth-of-type(#{$i})": {
    //     maxWidth: "100%",
    //   },
    // },
  };
};
