const debug = true
const mode = 'uni_admin' //uni_admin:uniadmin后台,vk_admin:vkadmin后台
function smodel_log(...args) {
	if (debug) console.log('SMODEL LOG:', ...args)
}

function navigateBack(delta=1,timeout=0) {
	let back = ()=>{
		console.log('navigateBack',mode)
		if (mode == 'vk_admin') uni.vk.menuTabs.closeCurrent();
		else uni.navigateBack({delta})
	}
	if (timeout>0) {
		setTimeout(back,timeout)
	} else {
		back()
	}
}

export {
	mode,
	debug,
	smodel_log,
	navigateBack
}
