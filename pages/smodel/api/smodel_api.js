const db = uniCloud.database()
const smodelOjb = uniCloud.importObject('smodel')
import {
	smodel_log
} from '../config.js'

async function getSmodelList(name, type) {
	let where = {
		'status': 1
	}
	if (name) where['name'] = new RegExp(name)
	if (type) where['type'] = type
	let res = await db.collection('smodel').where(where).get({
		getCount: true
	})
	smodel_log('smodel list', res)
	return {
		total: res.result.count,
		lists: res.result.data
	}
}

async function copySmodel(spage, npage, that) {
	let smodel = await db.collection('smodel').where({
		name: spage
	}).get({
		getOne: true
	})
	smodel = smodel.result.data
	let fields = await db.collection('sfield').where({
		smodel_id: smodel._id
	}).get()
	fields = fields.result.data

	smodel.name = npage
	delete smodel['_id']
	delete smodel['create_time']
	const transaction = await db.startTransaction()
	try {
		let res = await db.collection('smodel').add(smodel)
		that.$message.success('复制模型成功');
		let new_smodel_id = res.result.id

		smodel_log('smodel', spage, npage, smodel)
		smodel_log('fields', fields)
		for (let field of fields) {
			delete field['create_time']
			delete field['_id']
			field.smodel_id = new_smodel_id
			await db.collection('sfield').add(field)
			that.$message.success('复制字段' + field.name + '成功');
		}
	} catch (e) {
		await transaction.rollback()
		smodel_log('copySmodel', e)
		that.$message.error(e.message || '请求服务失败');
	}
}

async function deleteSmodel(_id, spage, smodel_choose, sfield_choose, menu_choose, permission_choose, that) {
	const transaction = await db.startTransaction()
	try {
		if (smodel_choose == 1) {
			await db.collection('smodel').doc(_id).update({
				'status': -1
			})
			that.$message.success('虚拟删除模型成功')
		} else if (smodel_choose == 2) {
			await db.collection('smodel').doc(_id).remove()
			that.$message.success('虚拟删除模型成功')
		}
		if (sfield_choose == 1) {
			await db.collection('smodel').where({
				smodel_id: _id
			}).update({
				'status': -1
			})
			that.$message.success('虚拟删除字段成功')
		} else if (sfield_choose == 2) {
			await db.collection('sfield').where({
				smodel_id: _id
			}).remove()
			that.$message.success('虚拟删除字段成功')
		}
		if (menu_choose == 2) {
			await db.collection('opendb-admin-menus').where({
				'menu_id': `${spage}_list`
			}).remove()
			that.$message.success('删除菜单成功')
		}
		if (permission_choose == 2) {
			await db.collection('uni-id-permissions').where({
				'permission_id': new RegExp(spage + '_')
			}).remove()
			that.$message.success('删除权限成功')
		}
	} catch (e) {
		await transaction.rollback()
		that.$message.error(e.message || '请求服务失败');
		console.error(`transaction error`, e)
	}
}

async function importSmodel(jsonStr, that) {
	const transaction = await db.startTransaction()
	try {
		let schemaCode = JSON.parse(jsonStr)
		let smodel = schemaCode.smodel
		let fields = schemaCode.fields
		delete smodel['create_time']
		await db.collection('smodel').add(smodel)
		that.$message.success('添加模型：' + smodel.name + '成功!')
		for (let field of fields) {
			delete field['create_time']
			await db.collection('sfield').add(field)
			that.$message.success('添加字段：' + smodel.name + '.' + field.name + '成功!')
		}
	} catch (e) {
		await transaction.rollback()
		that.$message.error('解析失败,' + e.message || '请求服务失败');
		console.error(`transaction error`, e)
	}
}

async function exportSmodel(spage) {
	let smodel = await db.collection('smodel').where({
		name: spage
	}).get({
		getOne: true
	})
	smodel = smodel.result.data

	let fields = await db.collection('sfield').where({
		smodel_id: smodel._id
	}).get()
	fields = fields.result.data
	return {
		smodel: smodel,
		fields: fields
	}
}

async function getSmodelInfo(name) {
	let res = await smodelOjb.getSmodelInfo(name)
	smodel_log("getSmodelInfo", res)
	return res
}

function getAdminMenus() {
	return db.collection('opendb-admin-menus').orderBy('sort', 'desc').get()
}

async function addSmodelMenu(quickMenuForm, that) {
	const transaction = await db.startTransaction()
	try {
		for (let p of quickMenuForm.permission) {
			let permission = map[p]
			let uip = {
				permission_id: permission.value,
				permission_name: permission.text,
				comment: quickMenuForm.name + '自动添加'
			}
			smodel_log('permission', permission, uip)
			await db.collection('uni-id-permissions').add(uip);
		}
		db.collection('opendb-admin-menus').add(quickMenuForm).then((res) => {
			that.$message.success('添加菜单成功');
		}).catch((err) => {
			smodel_log('quickmenu error', err)
			that.$message.error(err.message || '请求服务失败');
		}).finally(() => {})
	} catch (e) {
		await transaction.rollback()
		that.$message.error(e.message || '请求服务失败');
		console.error(`transaction error`, e)
	}
}

async function addSmodel(form, that) {
	let {
		result
	} = await db.collection('smodel').where({
		name: form.name
	}).count()
	let count = result.total
	console.log('result', result)
	if (count > 0) {
		return that.$message.error(`添加模型${form.name}已存在`);
	}
	form.collection = form.name
	return db.collection('smodel').add(form)
}

function updateSmodel(id, data) {
	return db.collection('smodel').doc(id).update(data)
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
	updateSmodel
}
