const debug = true
const mode = 'uni_admin' //uni_admin:uniadmin后台,vk_admin:vkadmin后台
function smodel_log(...args) {
	if (debug) console.log('SMODEL LOG:', ...args)
}

export {
	mode,
	smodel_log,
	debug
}
