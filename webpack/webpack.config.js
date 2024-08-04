const path = require("path");

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    "waveform-playlist": "./app.js",
  },
  output: {
   // path: __dirname + "/public/js",
    path: path.resolve(__dirname, '../public/js'),
    publicPath: "/waveform-playlist/js/",
    filename: "[name].js",
    library: {
      name: "WaveformPlaylist",
      type: "var",
    },
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-runtime"]],
          },
        },
      },
    ],
  },
};
