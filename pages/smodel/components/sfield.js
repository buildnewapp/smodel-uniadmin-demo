const typeJsonArray = [{
	"text": "字符",
	"value": "string",
	"bsonType": "string",
	"doc": "https://element.eleme.cn/#/zh-CN/component/input",
}, {
	"text": "文本框",
	"value": "text",
	"bsonType": "string",
	"doc": "https://element.eleme.cn/#/zh-CN/component/input",
}, {
	"text": "下拉单选",
	"value": "select",
	"bsonType": "int",
	"doc": "https://element.eleme.cn/#/zh-CN/component/select",
	"tip": `需要在JSON数组配置数据项，示例:[{text:"选项1",value:1}]，value需要是int`
}, {
	"text": "单选",
	"value": "radio",
	"bsonType": "int",
	"doc": "https://element.eleme.cn/#/zh-CN/component/radio",
	"tip": `需要在JSON数组配置数据项，示例:[{text:"选项1",value:1}]，value需要是int`
}, {
	"text": "复选框",
	"value": "checkbox",
	"bsonType": "array",
	"doc": "https://element.eleme.cn/#/zh-CN/component/checkbox",
	"tip": `需要在JSON数组配置数据项，示例:[{text:"选项1",value:1}]`
}, {
	"text": "下拉外链",
	"value": "selectone",
	"bsonType": "string",
	"tip": `需要在JSON对象配置数据项，示例:{smodel:"demo",text:"name",value:"_id",where:{},orderBy:{}}`
}, {
	"text": "模型选择器",
	"value": "chooseone",
	"bsonType": "string",
	"tip": `需要在JSON对象配置数据项，示例:{smodel:"demo",text:"name",value:"_id",where:{},orderBy:{}}`
}, {
	"text": "下拉多选",
	"value": "multiselect",
	"bsonType": "array",
	"doc": "https://element.eleme.cn/#/zh-CN/component/select",
	"tip": `需要在JSON数组配置数据项，示例:[{text:"选项1",value:1}]`
}, {
	"text": "数字",
	"value": "int",
	"bsonType": "int",
	"doc": "https://element.eleme.cn/#/zh-CN/component/input",

}, {
	"text": "级联选择器",
	"value": "cascader",
	"bsonType": "array",
	"doc": "https://element.eleme.cn/#/zh-CN/component/cascader",
	"tip": `需要在JSON数组配置数据项，示例:[{label:"选项1",value:1,children:[]}]`
}, {
	"text": "开关",
	"value": "switch",
	"bsonType": "bool",
	"doc": "https://element.eleme.cn/#/zh-CN/component/switch"
}, {
	"text": "滑块",
	"value": "slider",
	"bsonType": "int",
	"doc": "https://element.eleme.cn/#/zh-CN/component/slider"
}, {
	"text": "滑块范围",
	"value": "sliderrange",
	"bsonType": "array",
	"doc": "https://element.eleme.cn/#/zh-CN/component/slider"
}, {
	"text": "评分",
	"value": "rate",
	"bsonType": "int",
	"doc": "https://element.eleme.cn/#/zh-CN/component/rate"
}, {
	"text": "颜色选择器",
	"value": "colorpicker",
	"bsonType": "string",
	"doc": "https://element.eleme.cn/#/zh-CN/component/color-picker"
}, {
	"text": "时间选择器",
	"value": "timepicker",
	"bsonType": "string",
	"doc": "https://element.eleme.cn/#/zh-CN/component/time-picker"
}, {
	"text": "日期选择器",
	"value": "datepicker",
	"bsonType": "date",
	"doc": "https://element.eleme.cn/#/zh-CN/component/date-picker"
}, {
	"text": "日期时间选择器",
	"value": "datetimepicker",
	"bsonType": "timestamp",
	"doc": "https://element.eleme.cn/#/zh-CN/component/datetime-picker"
}, {
	"text": "文件上传",
	"value": "file",
	"bsonType": "file",
	"doc": "https://element.eleme.cn/#/zh-CN/component/upload"
}, {
	"text": "多文件上传",
	"value": "files",
	"bsonType": "array",
	"doc": "https://element.eleme.cn/#/zh-CN/component/upload"
}, {
	"text": "图片上传",
	"value": "image",
	"bsonType": "file",
	"doc": "https://element.eleme.cn/#/zh-CN/component/upload"
}, {
	"text": "多图片上传",
	"value": "images",
	"bsonType": "array",
	"doc": "https://element.eleme.cn/#/zh-CN/component/upload"
}, {
	"text": "JSON对象",
	"value": "json",
	"bsonType": "object",
	"tip": `JSON对象，示例:{"a":"aa","b":"bb"}`
}, {
	"text": "JSON数组",
	"value": "jsonarray",
	"bsonType": "array",
	"tip": `JSON数组，示例:[{"a":"aa","b":"bb"}]`
}, {
	"text": "富文本编辑器",
	"value": "editor",
	"bsonType": "string"
}, {
	"text": "展示alert",
	"value": "alert",
	"bsonType": "string",
	"doc": "https://element.eleme.cn/#/zh-CN/component/alert"
}, {
	"text": "自定义",
	"value": "custom",
	"bsonType": "string"
}]

const config = {
	fs: [{
			name: 'name',
			title: '字段标识',
			type: 'string',
		},
		{
			name: 'title',
			title: '字段标题',
			type: 'string',
		},
		{
			name: 'type',
			title: '数据类型',
			type: 'radio',
			extra: '',
			jsonarray: typeJsonArray
		},
		{
			name: 'defaultValue',
			title: '字段默认值',
			type: 'string',
		},
		{
			name: 'placeholder',
			title: '输入提示',
			type: 'string',
		},
		{
			name: 'remark',
			title: '输入备注',
			type: 'string',
		},
		{
			name: 'extra',
			title: '额外参数',
			type: 'text',
			remark: 'key-value配置项'
		},
		{
			name: 'config',
			title: '字段配置项',
			type: 'json',
			remark: '字段配置项,可扩展,如ELEMENT参数'
		},
		{
			name: 'json',
			title: 'JSON对象',
			type: 'json',
			remark: '外链选择配置'
		},
		{
			name: 'jsonarray',
			title: 'JSON数组',
			type: 'jsonarray',
			remark: 'radio/select等对象数组'
		},
		{
			name: 'col',
			title: '布局值',
			type: 'int',
		},
		{
			name: 'smodel_id',
			title: '关联模型',
			type: 'string',
		},
		{
			name: 'is_show',
			title: '始终显示',
			type: 'radio',
			jsonarray: [{
				"text": "始终显示",
				"value": 1
			}, {
				"text": "新增显示",
				"value": 2
			}, {
				"text": "编辑显示",
				"value": 3
			}, {
				"text": "不显示",
				"value": 4
			}]
		},
		{
			name: 'is_readonly',
			title: '是否只读',
			type: 'radio',
			jsonarray: [{
				"text": "只读关闭",
				"value": 1
			}, {
				"text": "新增只读",
				"value": 2
			}, {
				"text": "编辑只读",
				"value": 3
			}, {
				"text": "始终只读",
				"value": 4
			}]
		},
		{
			name: 'is_must',
			title: '是否必填',
			type: 'radio',
			jsonarray: [{
				"text": "不必填",
				"value": 1
			}, {
				"text": "新增必填",
				"value": 2
			}, {
				"text": "编辑必填",
				"value": 3
			}, {
				"text": "始终必填",
				"value": 4
			}]
		},
		{
			name: 'validate_time',
			title: '验证时间',
			type: 'radio',
			jsonarray: [{
				"text": "不验证",
				"value": 1
			}, {
				"text": "新增验证",
				"value": 2
			}, {
				"text": "编辑验证",
				"value": 3
			}, {
				"text": "始终验证",
				"value": 4
			}]
		},
		{
			name: 'validate_type',
			title: '验证类型',
			type: 'string',
		},
		{
			name: 'validate_rule',
			title: '验证规则',
			type: 'string',
		},
		{
			name: 'validate_tips',
			title: '验证错误提示',
			type: 'string',
		},
		{
			name: 'auto_time',
			title: '自动完成时间',
			type: 'radio',
			jsonarray: [{
				"text": "不自动完成",
				"value": 1
			}, {
				"text": "新增自动完成",
				"value": 2
			}, {
				"text": "编辑自动完成",
				"value": 3
			}, {
				"text": "始终自动完成",
				"value": 4
			}]
		},
		{
			name: 'auto_type',
			title: '自动完成类型',
			type: 'string',
		},
		{
			name: 'auto_rule',
			title: '自动完成规则',
			type: 'string',
		},
		{
			name: 'status',
			title: '数据状态',
			type: 'radio',
			jsonarray: [{
				"text": "正常",
				"value": 1
			}, {
				"text": "删除",
				"value": -1
			}]
		},
	],
	fsdefault: {
		smodel_id: '627780794324b90001fa281c',
		defaultValue: '',
		placeholder: '',
		remark: '',
		extra: '',
		json: {},
		jsonarray: [],
		col: 12,
		is_show: 1,
		is_readonly: 1,
		is_must: 1,
		validate_time: 1,
		validate_type: '',
		validate_rule: '',
		validate_tips: '',
		auto_time: 1,
		auto_type: '',
		auto_rule: '',
		status: 1
	}
}

function initFields() {
	const db = uniCloud.database()
	db.collection('sfield').where({
		'smodel_id': '627780794324b90001fa281c'
	}).remove().then(async res => {
		console.info('删除sfield字段成功')
		for (let f of config.fs) {
			let field = Object.assign({}, config.fsdefault, f)
			await db.collection('sfield').add(field).then(res => {
				console.log('添加字段' + field.name + '成功')
			}).catch(err => {
				console.log('添加字段' + field.name + '失败', JSON.stringify(field), err)
			})
		}
	})
}

async function initField() {
	const db = uniCloud.database()
	for (let f of config.fs) {
		if (f.name == 'config') {
			let field = Object.assign({}, config.fsdefault, f)
			await db.collection('sfield').add(field).then(res => {
				console.log('添加字段' + field.name + '成功')
			}).catch(err => {
				console.log('添加字段' + field.name + '失败', JSON.stringify(field), err)
			})
		}
	}
}

function build_http_url(url, param) {
	if (param != undefined) {
		Object.keys(param).forEach(function(key) {
			if (url.indexOf('?') != -1) {
				url += "&" + key + "=" + param[key];
			} else {
				url += "?" + key + "=" + param[key];
			}
		});
	}
	return url
}

let typeJsonMap = function() {
	let obj = {}
	for (let type of typeJsonArray) {
		obj[type.value] = type
	}
	return obj
}()


export {
	config,
	initField,
	initFields,
	build_http_url,
	typeJsonMap
}
