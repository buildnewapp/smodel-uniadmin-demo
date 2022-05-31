// 开发文档: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj

const db = uniCloud.database();

module.exports = {

	async getSmodelInfo(name) {
		let smodel = await db.collection('smodel').where({
			name: name
		}).get({
			getOne: true
		})
		if (smodel.affectedDocs == 1) smodel = smodel.data[0]
		let fields = await db.collection('sfield').where({
			smodel_id: smodel._id
		}).get()
		fields = fields.data
		// 模型字段预处理
		let fieldMap = {}
		for (let field of fields) {
			fieldMap[field.name] = field
		}
		return {
			smodel,
			fields,
			fieldMap
		}
	}
}
