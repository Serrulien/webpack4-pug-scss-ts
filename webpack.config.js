module.exports = (env, argv) => {

	const isDevMode = argv.mode.trim() !== 'production';

	process.env.NODE_ENV = (isDevMode) ? 'development' : 'production';

	const colorierBoolean = (bool) => { return (bool) ? '\x1b[32m'+bool : '\x1b[31m'+bool };
	
	console.log('\x1b[33mProduction mode:', colorierBoolean(!isDevMode) + '\x1b[0m');
	console.log('\x1b[33mDeveloppement mode:', colorierBoolean(isDevMode) + '\x1b[0m');

	let config;

	if ( isDevMode ) {
		config = require('./config/webpack.dev.config.js');
	} else {
		config = require('./config/webpack.prod.config.js');
	}

	return config;
}
