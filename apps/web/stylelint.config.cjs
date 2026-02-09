module.exports = {
  rules: {
    "import-notation": null,
    "at-rule-no-unknown": [
      true,
      { ignoreAtRules: ["tailwind", "apply", "layer", "theme", "config", "plugin"] },
    ],
  },
};
