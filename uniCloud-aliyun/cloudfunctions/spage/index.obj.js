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
	async fetchSelectone(option, query) {
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
			}).catch(e => {})
		return success(res.data)
	},
	async fetchSmodelpage(option, query) {
		let req = {}
		if (query != '') {
			req[option.value] = query
		}
		let res = await db.collection(option.smodel).where(req)
			.limit(10).get({
				getCount: true
			}).catch(e => {})
		let chooses = []
		for (let item of res.data) {
			let choose = {}
			choose[option.value] = item[option.value]
			choose[option.text] = item[option.text]
			chooses.push(choose)
		}
		return success(chooses)
	},
	async fetchSpageList(collection, form, orderBy, currentPage, pageSize) {
		const smodelObj = uniCloud.importObject('smodel')
		let smodelInfo = await smodelObj.getSmodelInfo(collection)
		console.log('smodelInfo', smodelInfo)
		let fieldMap = smodelInfo.fieldMap
		let req = {
			'status': 1
		}
		for (let k in form) {
			let field = fieldMap[k]
			if (!field) continue
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
			}).catch(e => {})
		let count = await db.collection(collection).where(req).count()
		return success({
			total: count.total,
			lists: res.data
		})
	},
	async fetchSpageData(collection, id) {
		let data = await db.collection(collection).where({
			_id: id
		}).get({
			getOne: true
		})
		return success(data.data[0])
	},
	addData(spage, data) {
		return db.collection(spage).add(data)
	},
	updateData(spage, id, data) {
		return db.collection(spage).doc(id).update(data)
	}
}
