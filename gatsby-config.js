require('@babel/register')({
  presets: [
    [
      'babel-preset-gatsby-package',
      {
        nodeVersion: 'current',
      },
    ],
  ],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

const config = require('./gatsby-config.ts');
delete config['__esModule'];

module.exports = config;

module.exports = {
  siteMetadata: {
    siteUrl: "https://seulog.netlify.app/"
  },
  plugins: ["gatsby-plugin-sitemap"],
}
