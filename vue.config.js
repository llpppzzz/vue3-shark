const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const resolve = dir => {
	return path.join(__dirname, dir)
}

module.exports = {
	chainWebpack: config => {
		config
			.plugin('auto-import')
				.use(AutoImport({
					resolvers: [ElementPlusResolver()],
				}))
			.end()
			.plugin('components')
				.use(Components({
					resolvers: [ElementPlusResolver()],
				}))
			.end()
		config.resolve.alias
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('views', resolve('src/views'))
			.set('utils', resolve('src/utils'))
			.set('api', resolve('src/api'))
			.set('mock', resolve('src/api/mock'))
	}
}
