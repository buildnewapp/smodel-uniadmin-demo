const db = uniCloud.database()
import {
	smodel_log
} from '../config.js'

async function getFileList(req, currentPage, pageSize, that) {
	let res = await db.collection('sfile').where(req).orderBy('create_time', 'desc').skip((
			currentPage - 1) * pageSize)
		.limit(pageSize).get({
			getCount: true
		}).catch(e => {
			that.$message.error(e.message);
		})
	smodel_log('res', req, res)
	return {
		total: res.result.count,
		lists: res.result.data
	}
}

function saveSfile(file) {
	return db.collection('sfile').add(file)
}

function deleteSfile(_id) {
	return db.collection('sfile').doc(_id).update({
		status: -1
	})
}

function updateGroup(_id, group) {
	return db.collection('sfile').doc(_id).update({
		group: group
	})
}

export {
	getFileList,
	saveSfile,
	deleteSfile
}
