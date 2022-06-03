const db = uniCloud.database()
import {
	smodel_log
} from '../config.js'
const sfileObj = uniCloud.importObject('sfile')

async function getFileList(req, currentPage, pageSize, that) {
	let res = await sfileObj.getFileList(req, currentPage, pageSize)
	return res.data
}

function saveSfile(file) {
	return sfileObj.saveSfile(file)
}

function deleteSfile(_id) {
	return sfileObj.deleteSfile(_id)
}

function updateGroup(_id, group) {
	return sfileObj.updateGroup(_id, group)
}

async function getSfileGroup(that) {
	let res = await sfileObj.getSfileGroup()
	console.log('group',res)
	return res.data
}

function saveSfileGroup(fileTabs, that) {
	smodel_log('fileTabs', fileTabs)
	db.collection('sconfig').where({
		'key': 'smodel-file-group'
	}).update({
		value: fileTabs
	}).then(res => {
		that.$message.success('修改文件分组成功')
	}).catch(err => {
		that.$message.error('修改文件分组失败,' + err)
	})
}

export {
	getFileList,
	saveSfile,
	deleteSfile,
	getSfileGroup,
	saveSfileGroup
}
