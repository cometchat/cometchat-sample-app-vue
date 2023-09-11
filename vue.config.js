const { defineConfig } = require("@vue/cli-service");

module.exports = {
  runtimeCompiler: true,
  publicPath: "",
  //  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  chainWebpack: (config) => {
    config.module
      .rule("pdf")
      .test(/\.pdf$/)
      .use("file-loader")
      .loader("file-loader"),
      config.module
        .rule("vue")
        .use("vue-loader")
        .tap((options) => {
          options.compilerOptions = {
            ...options.compilerOptions,
            isCustomElement: (tag) =>
              tag.startsWith("cometchat-") ||
              ["smart-replies", "full-screen-viewer"].includes(tag),
          };
          return options;
        });
  },
};
