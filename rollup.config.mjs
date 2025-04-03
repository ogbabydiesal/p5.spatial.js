import path from 'path';
// rollup.config.mjs
export default {
	input: 'src/app.js',
	output: {
		file: path.resolve('dist', 'p5.spatial.js')
	}
};