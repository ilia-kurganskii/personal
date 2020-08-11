var i18n = require("i18n");

i18n.configure({
  locales: ["en", "ru"],
  directory: "./src/assets/locales",
});

module.exports = function (key, options) {
  const locale = options.data.root.locale;
  i18n.setLocale(locale);
  return i18n.__(key);
};
