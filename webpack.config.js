module.exports = {
  entry: {
    main: './lib/foods.js'
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.css']
  },
  mode: 'development'
}
