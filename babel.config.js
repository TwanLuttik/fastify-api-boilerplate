const plugins = [
	[
		'module-resolver',
		{
			root: ['./dist'],
			alias: {
				'@internal/logic': './dist/logic',
				'@internal/logicv2': './dist/logicv2',
				'@internal/db': './dist/db/index',
				'@internal/server': './dist/server',
				'@internal/helpers': './dist/helpers/index',
				'@internal/types': './dist/types/index',
			},
		},
	],
];

module.exports = { presets: ['minify'], plugins, comments: false };
