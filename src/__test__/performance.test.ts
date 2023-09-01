import { fast, initializeServer } from '../index';

process.env.NODE_ENV = 'test';

const runTest = async () => {
	console.log('Test is starting');

	const result = await initializeServer({ port: 8283, host: '0.0.0.0' });
	console.log('and,', result);

	// console.time('Time this');

	// for (var i = 0; i < 100; i++) {
	// 	console.log(`loop ${i}`);

	// 	// fetch()
	// 	// Your stuff here
	// }

	// console.timeEnd('Time this');
};

(function () {
	runTest();
})();
