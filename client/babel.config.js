module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: 'commonjs',
        "targets": {
          "esmodules": true
        }
      },
    ],
    [
      '@babel/preset-react',
      {
        development: false,
      },
    ],
  ],
};
