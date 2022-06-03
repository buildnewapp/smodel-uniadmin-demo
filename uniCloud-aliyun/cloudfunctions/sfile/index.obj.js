// 开发文档: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
const db = uniCloud.database();
const dbCmd = db.command

function error(errCode, errMsg) {
	return response(errCode, errMsg)
}

function success(data) {
	return response(0, 'ok', data)
}

function response(errCode, errMsg, data = {}) {
	return {
		errCode: errCode,
		errMsg: errMsg,
		data: data
	}
}

module.exports = {
	async getFileList(where, currentPage, pageSize) {
		let res = await db.collection('sfile').where(where).orderBy('create_time', 'desc').skip((
				currentPage - 1) * pageSize)
			.limit(pageSize).get()

		let count = await db.collection('sfile').where(where).count()
		return success({
			total: count.total,
			lists: res.data
		})
	},
	saveSfile(file) {
		return db.collection('sfile').add(file)
	},
	deleteSfile(_id) {
		return db.collection('sfile').doc(_id).update({
			status: -1
		})
	},
	updateGroup(_id, group) {
		return db.collection('sfile').doc(_id).update({
			group: group
		})
	},
	async getSfileGroup() {
		let res = await db.collection('sconfig').where({
			'key': 'smodel-file-group'
		}).get()
		console.log('getSfileGroup', res)
		if (res.affectedDocs == 0) {
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
			return success(initConfig.value)
		} else {
			return success(res.data[0].value)
		}
	},
	saveSfileGroup(fileTabs) {
		db.collection('sconfig').where({
			'key': 'smodel-file-group'
		}).update({
			value: fileTabs
		}).then(res => {
			return success('修改文件分组成功')
		}).catch(err => {
			return error('修改文件分组失败,' + err)
		})
	}
}
