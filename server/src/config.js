import _ from 'lodash';
import path from 'path';

/**
 * Default configuration
 */
import * as defaultConfig from '../config/default.json';
const env = process.env.NODE_ENV || 'prod';

/**
 * File configuration
 */
const configSuffix = 'env.json';
const fileConfigPath = path.join(__dirname, '../config/', `${env}.${configSuffix}`);

let fileConfig = { env };
try {
	fileConfig = {
		...fileConfig,
		...require(fileConfigPath)
	};
} catch (e) {
	// env config file does not exist or has an invalid structure
	if (e.toString().includes('Unexpected token'))
		throw new Error(
			`Config file "${fileConfigPath}" contains an invalid JSON: ${e.toString()}`
		);
}

/**
 * Environment configuration
 */
const envConfig = {};
const environmentVariableKeys = [
	'PORT',
	'LOG_LEVEL',
];

for (const key of environmentVariableKeys) {
	if (!_.isUndefined(process.env[key]))
		envConfig[_.camelCase(key)] = process.env[key];
}

export default _.defaultsDeep(envConfig, fileConfig, defaultConfig);
