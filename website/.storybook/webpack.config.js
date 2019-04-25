module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("awesome-typescript-loader"),
        },
      ],
    },
    {
      test: /\.(rpp|RPP)$/,
      use: [
        {
          loader: "raw-loader",
        },
      ],
    }
  );

  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
