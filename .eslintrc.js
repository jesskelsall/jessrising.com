module.exports = {
  extends: [
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "plugin:security/recommended",
    "plugin:@next/next/recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "security"],
  rules: {
    "import/extensions": "off",
    "import/named": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/prefer-default-export": "off",
    "no-console": ["warn", { allow: ["error", "info", "warn"] }],
    "prettier/prettier": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-filename-extension": ["warn", { extensions: [".ts", ".tsx"] }],
    "react/jsx-key": ["error", { checkFragmentShorthand: true }],
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "warn",
    "react/require-default-props": "off",
  },
};
