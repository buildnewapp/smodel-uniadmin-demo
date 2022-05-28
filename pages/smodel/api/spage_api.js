const db = uniCloud.database()
const dbCmd = db.command
import {
	smodel_log
} from '../config.js'

async function fetchSelectone(option, query, that) {
	let req = {}
	if (query != '') {
		let or1 = {},
			or2 = {}
		or1[option.value] = option.value == '_id' ? query : new RegExp(query)
		or2[option.text] = new RegExp(query)
		req = dbCmd.or(or1, or2)
	}
	let res = await db.collection(option.smodel).where(req)
		.limit(10).get({
			getCount: true
		}).catch(e => {
			that.$message.error(e.message);
		})
	smodel_log('selectone fetchSelectone', query, res)
	return res.result.data
}

async function fetchSmodelpage(option, query, that) {
	let req = {}
	if (query != '') {
		req[option.value] = query
	}
	let res = await db.collection(option.smodel).where(req)
		.limit(10).get({
			getCount: true
		}).catch(e => {
			that.$message.error(e.message);
		})
	let chooses = []
	for (let item of res.result.data) {
		let choose = {}
		choose[option.value] = item[option.value]
		choose[option.text] = item[option.text]
		chooses.push(choose)
	}
	smodel_log('fetchSmodelpage', query, res)
	return chooses
}

async function fetchSpageList(collection, form, fieldMap, orderBy, currentPage, pageSize, that) {
	let req = {
		'status': 1
	}
	for (let k in form) {
		let field = fieldMap[k]
		if (!field) continue
		smodel_log('field.type', k, field.type)
		if (form[k]) {
			if (field.name == 'smodel_id') req[k] = form[k]
			else if (['string', 'text'].indexOf(field.type) > -1) req[k] = new RegExp(form[k])
			else if (['radio', 'select', 'selectone', 'switch', 'rate', 'colorpicker'].indexOf(field
					.type) > -1) req[k] = form[k]
			else if (['checkbox', 'multiselect'].indexOf(field.type) > -1) req[k] = dbCmd.in([form[
				k]])
			else if (['int'].indexOf(field.type) > -1) req[k] = form[k] * 1
		}
	}
	let res = await db.collection(collection).where(req).orderBy(orderBy[0], orderBy[1]).skip((
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

async function fetchSpageData(collection, id) {
	let data = await db.collection(collection).where({
		_id: id
	}).get({
		getOne: true
	})
	return data.result.data
}

function addData(spage, data) {
	return db.collection(spage).add(data)
}

function updateData(spage, id, data) {
	return db.collection(spage).doc(id).update(data)
}

export {
	fetchSelectone,
	fetchSmodelpage,
	fetchSpageList,
	fetchSpageData,
	addData,
	updateData
}
