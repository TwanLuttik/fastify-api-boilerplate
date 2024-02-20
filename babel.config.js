const plugins = [
	[
		'module-resolver',
		{
			root: ['./dist'],
			alias: {
				'@internal/logic': './dist/logic',
				'@internal/server': './dist/server',
			},
		},
	],
];

module.exports = { presets: ['@babel/preset-typescript', 'minify'], plugins, comments: false };
