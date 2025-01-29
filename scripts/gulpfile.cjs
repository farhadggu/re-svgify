const gulp = require("gulp"),
  replace = require("gulp-replace"),
  rename = require("gulp-rename"),
  svgmin = require("gulp-svgmin"),
  wrap = require("gulp-wrap"),
  tap = require("gulp-tap"),
  fs = require("fs"),
  path = require("path"); // Add this line to import the 'path' module

// Get paths from command-line arguments
const iconsFolder = process.argv.includes("--iconsFolder")
  ? process.argv[process.argv.indexOf("--iconsFolder") + 1]
  : "./_icons"; // Default fallback
const componentsFolder = process.argv.includes("--componentsFolder")
  ? process.argv[process.argv.indexOf("--componentsFolder") + 1]
  : "./components/icons"; // Default fallback

const jsx_template = path.join(__dirname, "../src/icon-template.txt");

let icons_component_list = [];

gulp.task("icons_components", function () {
  return gulp
    .src([path.join(iconsFolder, "*.svg")]) // Use path.join for cross-platform compatibility
    .pipe(replace(/<\?xml.*?\?>\s*/g, ""))
    .pipe(replace(/<!--.*?-->\s*/g, ""))
    .pipe(
      svgmin({
        multipass: true,
        full: true,
        plugins: [
          {
            name: "cleanupIDs",
            params: { remove: true, minify: true },
          },
          "removeDoctype",
          "removeComments",
          "removeTitle",
          "removeDimensions",
          "collapseGroups",
          {
            name: "cleanupNumericValues",
            params: { floatPrecision: 4 },
          },
          {
            name: "convertColors",
            params: { names2hex: true, rgb2hex: true },
          },
          "removeStyleElement",
          "removeEmptyContainers",
          {
            name: "removeAttrs",
            params: {
              attrs: ["(filter|fill|stroke|fill-rule|stroke-width|transform|style|class|data.*)", "svg:(width|height)"],
            },
          },
          "removeUselessDefs",
        ],
      })
    )
    .pipe(
      tap((file) => {
        const svgContent = file.contents.toString();
        file.applyStroke = /stroke-linecap="round"|stroke-linejoin="round"/.test(svgContent) ? true : false;
      })
    )
    .pipe(replace(/<\/?svg(.*?)>/g, ""))
    .pipe(wrap({ src: jsx_template }, { applyStroke: (file) => file.applyStroke }))
    .pipe(
      rename(function (path) {
        icons_component_list.push(path.basename);
        path.extname = ".tsx";
      })
    )
    .pipe(gulp.dest(componentsFolder));
});

gulp.task("icons_component_main", function (cb) {
  return fs.writeFile(
    path.join(componentsFolder, "index.ts"),
    "/* GENERATED FILE */\n\n" +
      icons_component_list
        .map((item) => {
          let module_name = item
            .replace(/[-()]/g, "") // Remove hyphens and parentheses
            .replace(/(?:^|[-_])(\w)/g, (_, c) => (c ? c.toUpperCase() : "")); // Convert to CamelCase

          return `export { default as Icon${module_name} } from './${item}';`;
        })
        .join("\n"),
    cb
  );
});

gulp.task("default", gulp.series("icons_components", "icons_component_main"));
