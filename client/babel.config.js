module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
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
