export const isDev = () => {
  return process.env["WEBPACK_SERVE"] === "true";
};
