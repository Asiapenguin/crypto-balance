// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
const copy = require("../node_modules/@ionic/app-scripts/config/copy.config");
module.exports = Object.assign(copy, {
  copyFontawesomeFonts: {
    src: ["{{ROOT}}/node_modules/font-awesome/fonts/**/*"],
    dest: "{{WWW}}/assets/fonts"
  },
  copyFontawesomeCss: {
    src: ["{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css"],
    dest: "{{WWW}}/assets/css"
  }
});
