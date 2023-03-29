import { defineConfig } from "cypress";
import * as path from 'path';

export default defineConfig({
	env: {
		"MSTR_BASE_URL": "https://u5.pglabs.xyz/MicroStrategy/servlet/mstrWeb",
        "MSTR_TEST_USER": "a",
        "MSTRPP_BASE_URL": "https://dev.pglabs.xyz",
        "MSTRPP_TEST_USER": "microstrategyautomation@gmail.com",
        "MSTRPP_TEST_PASSWORD": "1234"
	  },
	e2e: {
		setupNodeEvents(on, config) {
			on('before:browser:launch', (browser, launchOptions) => {
				launchOptions.extensions.push(path.resolve('dist_manifest_v3'));
				return launchOptions;
			});
			config.env = config.env || {};

			config.env = {...config.env, ...process.env};
			return config;
		}
	},
	defaultCommandTimeout: 30000
});
