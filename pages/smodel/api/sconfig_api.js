const db = uniCloud.database()
import {
	smodel_log
} from '../config.js'

async function getSfileGroup(that) {
	let res = await db.collection('sconfig').where({
		'key': 'smodel-file-group'
	}).get({
		getOne: true
	}).catch(e => {
		that.$message.error(e.message);
	})
	if (!res.result.data) {
		let initConfig = {
			key: 'smodel-file-group',
			type: 'jsonarray',
			value: [{
				name: '分组1',
				value: 1
			}],
			status: 1
		}
		await db.collection('sconfig').add(initConfig)
		return initConfig.value
	} else {
		return res.result.data.value
	}
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
	getSfileGroup,
	saveSfileGroup
}
