const smodelOjb = uniCloud.importObject('smodel')
import {
	smodel_log
} from '../config.js'

async function getSmodelList(name, type) {
	let res = await smodelOjb.getSmodelList(name, type)
	return res.data
}

async function copySmodel(spage, npage, that) {
	try {
		await smodelOjb.copySmodel(spage, npage)
		that.$message.success('复制模型成功');
	} catch (e) {
		smodel_log('copySmodel', e)
		that.$message.error(e.message || '请求服务失败');
	}
}

async function deleteSmodel(_id, spage, smodel_choose, sfield_choose, menu_choose, permission_choose, that) {
	try {
		await smodelOjb.deleteSmodel(_id, spage, smodel_choose, sfield_choose, menu_choose, permission_choose)
		that.$message.success('删除模型成功');
	} catch (e) {
		smodel_log('copySmodel', e)
		that.$message.error(e.message || '请求服务失败');
	}
}

async function importSmodel(jsonStr, that) {
	try {
		await smodelOjb.importSmodel(jsonStr)
		that.$message.success('导入模型成功');
	} catch (e) {
		smodel_log('importSmodel', e)
		that.$message.error(e.message || '请求服务失败');
	}
}

async function exportSmodel(spage) {
	return smodelOjb.getSmodelInfo(spage)
}

async function getSmodelInfo(name) {
	let res = await smodelOjb.getSmodelInfo(name)
	smodel_log("getSmodelInfo", res)
	return res
}

function getAdminMenus() {
	return smodelOjb.getAdminMenus()
}

function getAdminPermissions() {
	return smodelOjb.getAdminPermissions()
}

async function addSmodelMenu(menus, permissions, that) {
	try {
		await smodelOjb.addSmodelMenu(menus, permissions)
		that.$message.success('快速菜单成功');
	} catch (e) {
		smodel_log('addSmodelMenu', e)
		that.$message.error(e.message || '请求服务失败');
	}
}

async function addSmodel(form) {
	await smodelOjb.addSmodel(form)
}

function updateSmodel(id, data) {
	return smodelOjb.updateSmodel(id, data)
}

function initSmodel(option) {
	return smodelOjb.initSmodel(option)
}

export {
	getSmodelList,
	copySmodel,
	deleteSmodel,
	importSmodel,
	exportSmodel,
	getSmodelInfo,
	getAdminMenus,
	addSmodelMenu,
	addSmodel,
	updateSmodel,
	initSmodel,
	getAdminPermissions
}
