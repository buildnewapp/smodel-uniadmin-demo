const db = uniCloud.database()
const dbCmd = db.command
const spageObj = uniCloud.importObject('spage')
import {
	smodel_log
} from '../config.js'

async function fetchSelectone(option, query, that) {
	return await spageObj.fetchSelectone(option, query)
}

async function fetchSmodelpage(option, query, that) {
	return await spageObj.fetchSmodelpage(option, query)
}

async function fetchSpageList(collection, form, orderBy, currentPage, pageSize, that) {
	let res = await spageObj.fetchSpageList(collection, form, orderBy, currentPage, pageSize)
	return res.data
}

async function fetchSpageData(collection, id) {
	let res = await spageObj.fetchSpageData(collection, id)
	return res.data
}

function addData(spage, data) {
	return spageObj.addData(spage, data)
}

function updateData(spage, id, data) {
	return spageObj.updateData(spage, id, data)
}

export {
	fetchSelectone,
	fetchSmodelpage,
	fetchSpageList,
	fetchSpageData,
	addData,
	updateData
}
