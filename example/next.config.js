module.exports = {
  trailingSlash: true,
  exportPathMap: () => {
    return {
      '/': { page: '/' },
    };
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.txt$/i,
      use: [
        {
          loader: 'raw-loader',
          options: {
            esModule: false,
          },
        },
      ],
    });

    return config;
  },
};
