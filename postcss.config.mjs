const config = {
  plugins: [
    "@tailwindcss/postcss",
    "@csstools/postcss-cascade-layers",
    "postcss-media-minmax",
    ["@csstools/postcss-oklab-function", { preserve: true }],
  ],
};

export default config;
