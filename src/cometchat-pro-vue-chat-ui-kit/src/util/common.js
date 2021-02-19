/*eslint no-prototype-builtins: "error"*/
const emailPattern = new RegExp(
  "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}",
  "gi"
); ///([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
const urlPattern = new RegExp(
  "(^|[\\s.:;?\\-\\]<\\(])" +
    "((https?://|www\\.|pic\\.)[-\\w;/?:@&=+$\\|\\_.!~*\\|'()\\[\\]%#,☺]+[\\w/#](\\(\\))?)" +
    "(?=$|[\\s',\\|\\(\\).:;?\\-\\[\\]>\\)])",
  "gi"
); ///(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
const phoneNumPattern = new RegExp(
  "\\s*(?:\\+?(\\d{1,3}))?([-. (]*(\\d{3})[-. )]*)?((\\d{3})[-. ]*(\\d{2,4})(?:[-.x ]*(\\d+))?)\\s*",
  "g"
);

/**
 * Converts a string to its HTML equivalent
 * @param {*} message
 */
export const linkify = (message) => {
  let outputStr = message.replace(
    phoneNumPattern,
    "<a target='blank' rel='noopener noreferrer' href='tel:$&'>$&</a>"
  );
  outputStr = outputStr.replace(
    emailPattern,
    "<a target='blank' rel='noopener noreferrer' href='mailto:$&'>$&</a>"
  );
  outputStr = outputStr.replace(
    urlPattern,
    "<a target='blank' rel='noopener noreferrer' href='$&'>$&</a>"
  );

  return outputStr;
};

/**
 * Extracts extension data from message
 * @param {*} message
 * @param {*} extensionKey
 */
export const getExtensionsDataFromMessage = (message, extensionKey) => {
  let output = null;

  if (Object.prototype.hasOwnProperty.call(message, "metadata")) {
    const metadata = message.metadata;
    const injectedObject = metadata["@injected"];
    if (
      injectedObject &&
      Object.prototype.hasOwnProperty.call(injectedObject, "extensions")
    ) {
      const extensionsObject = injectedObject["extensions"];
      if (
        extensionsObject &&
        Object.prototype.hasOwnProperty.call(extensionsObject, extensionKey)
      ) {
        output = extensionsObject[extensionKey];
      }
    }
  }
  return output;
};

/**
 * Simple logger utility
 * @param {*} type
 * @param  {...any} args
 */
export const logger = (type = "error", ...args) => {
  if (process.env.NODE_ENV === "development") {
    const log = console[type];

    if (!log) {
      return;
    }

    if (args) {
      log(...args);
    }
  }
};
