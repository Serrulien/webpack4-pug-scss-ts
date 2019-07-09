const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV === "development";

module.exports = {
	entry: {
		homepage: './src/homepage.ts',
		products: './src/products.ts'
		// index: ['./src/homepage.ts', './src/products.ts'] // if both pages share the same assets, you may use https://webpack.js.org/plugins/split-chunks-plugin/ for further optimization
	},
  	output: {
		filename: devMode ? '[name].js' : '[name].[contenthash].js',
		path: path.resolve(__dirname, '../dist')
	},
	resolve: { // https://webpack.js.org/concepts/module-resolution/
		extensions: ['.ts', '.js']
	},
	module: {
		rules:
		[
			{
				test: /\.pug$/,
				use: 'pug-loader',
				exclude: /node_modules/
			},
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$|.scss$/,
				use: 
				[
                    { 
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode ? true : false
                        }
                    },
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: 
				[
					{
						loader: 'url-loader',
						options: {
							limit: 8*(2**10), // 8KiB
							fallback: 'file-loader', // file-loader will get the same options when file's size is over the limit
							name: devMode ? '[name].[ext]' : '[name].[contenthash].[ext]',
							outputPath: 'assets/images'
						}
					}
				]
			}
		]
	},
  	plugins:
  	[
		new HtmlWebpackPlugin({
			template: './src/homepage.pug',
			filename: 'homepage.html',
			inject: true,
			chunks: ['homepage', 'runtime'],
			templateParameters: require('../src/generate-template-params.js')
		}),
		new HtmlWebpackPlugin({
			template: './src/products.pug',
			filename: 'products.html',
			chunks: ['products', 'runtime'],
			inject: true
		}),
		// if you want to copy all your assets even if they are not imported in the code
		// new CopyWebpackPlugin([{
		// 	from: './src/assets/images',
		// 	to: 'assets/images'
		// }]),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[contenthash].css',
			chunkFilename: devMode ? '[name].css' : '[name].[contenthash].css',
		})
	]
};
