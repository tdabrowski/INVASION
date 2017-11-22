module.exports	=	{
	//entry:	"./js/app.jsx",
	entry:	"./src/js/app.jsx",
	output:	{filename:"./js/main.js"	},
	devServer: {
		inline: true,
		contentBase:'./',
		port: 3001
	},
	devtool: 'eval-source-map',
	watch:	true,
	module:	{
		loaders: [ {
		  test:	/\.jsx$/, exclude: /node_modules/,
		  loader:'babel-loader',
		  query:{presets:['es2015','stage-2','react']}
			}
		]
	}
}
