'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	return {code:0, msg:'禁止操作'}
	const db = uniCloud.database();
	await db.collection('smodel').remove()
	await db.collection('sfield').remove()
	await db.collection('opendb-admin-menus').remove()
	await db.collection('uni-id-permissions').remove()
	await db.collection('deme').remove()
	await db.collection('opendb-admin-menus').add([{
		"menu_id": "index",
		"name": "首页",
		"icon": "admin-icons-dashboard",
		"url": "/",
		"sort": 100,
		"parent_id": "",
		"permission": [],
		"enable": true,
		"create_date": 1602662469396
	}, {
		"menu_id": "system_management",
		"name": "系统管理",
		"icon": "admin-icons-fl-xitong",
		"url": "",
		"sort": 1000,
		"parent_id": "",
		"permission": [],
		"enable": true,
		"create_date": 1602662469396
	}, {
		"menu_id": "system_user",
		"name": "用户管理",
		"icon": "admin-icons-manager-user",
		"url": "/pages/system/user/list",
		"sort": 1010,
		"parent_id": "system_management",
		"permission": [],
		"enable": true,
		"create_date": 1602662469398
	}, {
		"menu_id": "system_role",
		"name": "角色管理",
		"icon": "admin-icons-manager-role",
		"url": "/pages/system/role/list",
		"sort": 1020,
		"parent_id": "system_management",
		"permission": [],
		"enable": true,
		"create_date": 1602662469397
	}, {
		"menu_id": "system_permission",
		"name": "权限管理",
		"icon": "admin-icons-manager-permission",
		"url": "/pages/system/permission/list",
		"sort": 1030,
		"parent_id": "system_management",
		"permission": [],
		"enable": true,
		"create_date": 1602662469396
	}, {
		"menu_id": "system_menu",
		"name": "菜单管理",
		"icon": "admin-icons-manager-menu",
		"url": "/pages/system/menu/list",
		"sort": 1040,
		"parent_id": "system_management",
		"permission": [],
		"enable": true,
		"create_date": 1602662469396
	}, {
		"menu_id": "system_app",
		"name": "应用管理",
		"icon": "admin-icons-manager-app",
		"url": "/pages/system/app/list",
		"sort": 1035,
		"parent_id": "system_management",
		"permission": [],
		"enable": true,
		"create_date": 1602662469399
	}, {
		"menu_id": "system_tag",
		"name": "标签管理",
		"icon": "admin-icons-manager-tag",
		"url": "/pages/system/tag/list",
		"sort": 1037,
		"parent_id": "system_management",
		"permission": [],
		"enable": true,
		"create_date": 1602662479389
	}, {
		"permission": [],
		"enable": true,
		"menu_id": "safety_statistics",
		"name": "安全审计",
		"icon": "admin-icons-safety",
		"url": "",
		"sort": 3100,
		"parent_id": "",
		"create_date": 1638356430871
	}, {
		"permission": [],
		"enable": true,
		"menu_id": "safety_statistics_user_log",
		"name": "用户日志",
		"icon": "",
		"url": "/pages/system/safety/list",
		"sort": 3101,
		"parent_id": "safety_statistics",
		"create_date": 1638356430871
	}, {
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat",
		"name": "uni 统计",
		"icon": "admin-icons-tongji",
		"url": "",
		"sort": 2100,
		"parent_id": "",
		"create_date": 1638356430871
	}, {
		"parent_id": "uni-stat",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-device",
		"name": "设备统计",
		"icon": "admin-icons-shebeitongji",
		"url": "",
		"sort": 2120,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-device",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-device-overview",
		"name": "概况",
		"icon": "",
		"url": "/pages/uni-stat/device/overview/overview",
		"sort": 2121,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-device",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-device-activity",
		"name": "活跃度",
		"icon": "",
		"url": "/pages/uni-stat/device/activity/activity",
		"sort": 2122,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-device",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-device-trend",
		"name": "趋势分析",
		"icon": "",
		"url": "/pages/uni-stat/device/trend/trend",
		"sort": 2123,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-device",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-device-retention",
		"name": "留存",
		"icon": "",
		"url": "/pages/uni-stat/device/retention/retention",
		"sort": 2124,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-device",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-device-comparison",
		"name": "平台对比",
		"icon": "",
		"url": "/pages/uni-stat/device/comparison/comparison",
		"sort": 2125,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-device",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-device-stickiness",
		"name": "粘性",
		"icon": "",
		"url": "/pages/uni-stat/device/stickiness/stickiness",
		"sort": 2126,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-user",
		"name": "注册用户统计",
		"icon": "admin-icons-yonghutongji",
		"url": "",
		"sort": 2122,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-user",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-user-overview",
		"name": "概况",
		"icon": "",
		"url": "/pages/uni-stat/user/overview/overview",
		"sort": 2121,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-user",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-user-activity",
		"name": "活跃度",
		"icon": "",
		"url": "/pages/uni-stat/user/activity/activity",
		"sort": 2122,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-user",
		"permission": [],
		"enable": true,
		"icon": "",
		"menu_id": "uni-stat-user-trend",
		"name": "趋势分析",
		"url": "/pages/uni-stat/user/trend/trend",
		"sort": 2123,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-user",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-user-retention",
		"name": "留存",
		"icon": "",
		"url": "/pages/uni-stat/user/retention/retention",
		"sort": 2124,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-user",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-user-comparison",
		"name": "平台对比",
		"icon": "",
		"url": "/pages/uni-stat/user/comparison/comparison",
		"sort": 2125,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-user",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-user-stickiness",
		"name": "粘性",
		"icon": "",
		"url": "/pages/uni-stat/user/stickiness/stickiness",
		"sort": 2126,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-page-analysis",
		"name": "页面统计",
		"icon": "admin-icons-page-ent",
		"url": "",
		"sort": 2123,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-page-analysis",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-page-res",
		"name": "受访页",
		"icon": "",
		"url": "/pages/uni-stat/page-res/page-res",
		"sort": 2131,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-page-analysis",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-page-ent",
		"name": "入口页",
		"icon": "",
		"url": "/pages/uni-stat/page-ent/page-ent",
		"sort": 2132,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-senceChannel",
		"name": "渠道/场景值分析",
		"icon": "admin-icons-qudaofenxi",
		"url": "",
		"sort": 2150,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-senceChannel",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-senceChannel-scene",
		"name": "场景值（小程序）",
		"icon": "",
		"url": "/pages/uni-stat/scene/scene",
		"sort": 2151,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-senceChannel",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-senceChannel-channel",
		"name": "渠道（app）",
		"icon": "",
		"url": "/pages/uni-stat/channel/channel",
		"sort": 2152,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-event-event",
		"name": "自定义事件",
		"icon": "admin-icons-shijianfenxi",
		"url": "/pages/uni-stat/event/event",
		"sort": 2160,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-error",
		"name": "错误统计",
		"icon": "admin-icons-cuowutongji",
		"url": "",
		"sort": 2170,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-error",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-error-js",
		"name": "js报错",
		"icon": "",
		"url": "/pages/uni-stat/error/js/js",
		"sort": 2171,
		"create_date": 1638356902516
	}, {
		"parent_id": "uni-stat-error",
		"permission": [],
		"enable": true,
		"menu_id": "uni-stat-error-app",
		"name": "app崩溃",
		"icon": "",
		"url": "/pages/uni-stat/error/app/app",
		"sort": 2172,
		"create_date": 1638356902516
	}])
	
	let smodels = [],
		sfields = [],
		menus = [],
		permissions = []
	
	let smodel_sfield =
		`{"_id": "sfield","addBtn": 1,"collection": "sfield","create_time": 1652766176430,"delBtn": false,"editBtn": 1,"exportBtn": false,"formGroups": [{"fields": ["name","title","type","defaultValue","remark","placeholder","col","extra","smodel_id","config","json","jsonarray","is_readonly","validate_type","is_show","is_must"],"name": "基础"},{"fields": ["validate_time","auto_type","validate_rule","auto_rule","validate_tips","auto_time"],"name": "验证和完成"},{"fields": ["status"],"name": "状态"}],"formType": "tab","girdData": [{"field": "name","fun": "","label": "字段标识","sortable": true,"type": "field","width": ""},{"align": "center","field": "title","fun": "","label": "字段标题","sortable": false,"type": "field","width": ""},{"align": "center","field": "type","fun": "","label": "数据类型","type": "field","width": ""},{"field": "col","fun": "","label": "布局值","type": "field","width": ""},{"field": "is_show","fun": "","label": "始终显示","type": "field","width": ""},{"field": "","fun": "","label": "操作","type": "action"}],"importBtn": true,"multBtn": false,"name": "sfield","pageSize": 50,"searchFields": ["name","title"],"searchFormFields": ["name","title","type","col","smodel_id","is_show","is_readonly","is_must"],"status": 1,"title": "字段模型","type": "db"}`
	let smodel_json = `[{"_id": "628b252a0cb5d500018a52bc","addBtn": true,"collection": "field_enums","create_time": 1653286186676,"delBtn": false,"editBtn": true,"exportBtn": false,"formGroups": [{"fields": ["text","value"],"name": "基础"}],"formType": "base","girdData": [{"field": "text","fun": "","label": "枚举值","type": "field"},{"field": "value","fun": "","label": "枚举文本","type": "field"}],"importBtn": false,"multBtn": false,"name": "sfield_enums","searchFields": ["text","value"],"searchFormFields": [],"status": 1,"title": "字段枚举","type": "json"},{"_id": "628b2a807a1d270001cce9d9","addBtn": true,"collection": "field_smodel_config","create_time": 1653398152526,"delBtn": false,"editBtn": true,"exportBtn": false,"formGroups": [{"fields": ["smodel","text","value"],"name": "基础"}],"formType": "base","girdData": [{"field": "smodel","fun": "","label": "模型名称","type": "field"},{"field": "text","fun": "","label": "模型数据键","type": "field"},{"field": "value","fun": "","label": "模型数据值","type": "field"}],"importBtn": false,"multBtn": false,"name": "sfield_smodel_config","searchFields": ["smodel","value","text"],"searchFormFields": [],"status": 1,"title": "字段模型配置","type": "json"}]`
	smodels.push(JSON.parse(smodel_sfield))
	smodels.push(...JSON.parse(smodel_json))		
	let sfield_sfield =
		`[{"_id":"62792f392e897900015c6f90","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109113411,"defaultValue":"","extra":"","is_must":4,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"name","placeholder":"","remark":"必须，英文","smodel_id":"sfield","status":1,"title":"字段标识","type":"string","update_time":1652109113411,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f3abc65980001b29508","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109113955,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"title","placeholder":"","remark":"标题，必须","smodel_id":"sfield","status":1,"title":"字段标题","type":"string","update_time":1652109113955,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f3bca519e0001664e6e","auto_rule":"","auto_time":1,"auto_type":"","col":24,"create_time":1652109114513,"defaultValue":"string","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[{"text":"字符","value":"string"},{"text":"文本框","value":"text"},{"text":"下拉单选","value":"select"},{"text":"单选","value":"radio"},{"text":"复选框","value":"checkbox"},{"text":"下拉外链","value":"selectone"},{"text":"模型选择器","value":"chooseone"},{"text":"下拉多选","value":"multiselect"},{"text":"数字","value":"int"},{"text":"级联选择器","value":"cascader"},{"text":"开关","value":"switch"},{"text":"滑块","value":"slider"},{"text":"滑块范围","value":"sliderrange"},{"text":"评分","value":"rate"},{"text":"颜色选择器","value":"colorpicker"},{"text":"时间选择器","value":"timepicker"},{"text":"日期选择器","value":"datepicker"},{"text":"日期时间选择器","value":"datetimepicker"},{"text":"文件上传","value":"file"},{"text":"多文件上传","value":"files"},{"text":"图片上传","value":"image"},{"text":"多图片上传","value":"images"},{"text":"JSON对象","value":"json"},{"text":"JSON数组","value":"jsonarray"},{"text":"编辑器","value":"editor"},{"text":"展示alert","value":"alert"},{"text":"自定义","value":"custom"}],"name":"type","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"数据类型","type":"radio","update_time":1652109114513,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f3cf77dda0001631698","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109115523,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"defaultValue","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"字段默认值","type":"string","update_time":1652109115523,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f3de107d4000173819b","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109117211,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"placeholder","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"输入提示","type":"string","update_time":1652109117211,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f3e14606700015fff2a","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109118134,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"remark","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"输入备注","type":"string","update_time":1652109118134,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f3e4f2b7900017c09f3","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109118764,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"extra","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"额外参数","type":"text","update_time":1652109118764,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f3f0520690001e4471a","auto_rule":"","auto_time":1,"auto_type":"","col":12,"config":{"smodel":"sfield_smodel_config","type":"object"},"create_time":1652109119355,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"json","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"JSON对象","type":"json","update_time":1652109119355,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f40f19c1200018cfcca","auto_rule":"","auto_time":1,"auto_type":"","col":12,"config":{"smodel":"sfield_enums","type":"array"},"create_time":1652109119938,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"jsonarray","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"JSON数组","type":"jsonarray","update_time":1652109119938,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f414f2b7900017c0a11","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109121323,"defaultValue":"12","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"col","placeholder":"","remark":"输入值0~24","smodel_id":"sfield","status":1,"title":"布局值","type":"int","update_time":1652109121323,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f42af15800001fdf58f","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109121981,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":{"smodel":"smodel","text":"name","value":"_id"},"jsonarray":[],"name":"smodel_id","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"关联模型","type":"selectone","update_time":1652109121981,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f4274de630001ced09a","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109122542,"defaultValue":"1","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[{"text":"始终显示","value":1},{"text":"新增显示","value":2},{"text":"编辑显示","value":3},{"text":"不显示","value":4}],"name":"is_show","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"始终显示","type":"radio","update_time":1652109122542,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f438264d8000171c75b","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109123150,"defaultValue":"1","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[{"text":"只读关闭","value":1},{"text":"新增只读","value":2},{"text":"编辑只读","value":3},{"text":"始终只读","value":4}],"name":"is_readonly","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"是否只读","type":"radio","update_time":1652109123150,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f43e89f570001368422","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109123706,"defaultValue":"1","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[{"text":"不必填","value":1},{"text":"新增必填","value":2},{"text":"编辑必填","value":3},{"text":"始终必填","value":4}],"name":"is_must","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"是否必填","type":"radio","update_time":1652109123706,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f44bc044a0001facf7c","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109124272,"defaultValue":"1","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[{"text":"不验证","value":1},{"text":"新增验证","value":2},{"text":"编辑验证","value":3},{"text":"始终验证","value":4}],"name":"validate_time","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"验证时间","type":"radio","update_time":1652109124272,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f452a3f590001c7f279","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109125151,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"validate_type","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"验证类型","type":"string","update_time":1652109125151,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f46f4194f0001eb271a","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109125753,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"validate_rule","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"验证规则","type":"string","update_time":1652109125753,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f472aa1a1000195ff96","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109126398,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"validate_tips","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"验证错误提示","type":"string","update_time":1652109126398,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f48b8da1200011e18d4","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109128116,"defaultValue":"1","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[{"text":"不自动完成","value":1},{"text":"新增自动完成","value":2},{"text":"编辑自动完成","value":3},{"text":"始终自动完成","value":4}],"name":"auto_time","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"自动完成时间","type":"radio","update_time":1652109128116,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f4979d47100018ce7a5","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109128760,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"auto_type","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"自动完成类型","type":"string","update_time":1652109128760,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f49f19c1200018cfd34","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109129422,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"auto_rule","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"自动完成规则","type":"string","update_time":1652109129422,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"62792f4a0520690001e44781","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652109130008,"defaultValue":"1","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[{"text":"正常","value":1},{"text":"删除","value":-1}],"name":"status","placeholder":"","remark":"","smodel_id":"sfield","status":1,"title":"数据状态","type":"radio","update_time":1652109130008,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""},{"_id":"6279c73d79d47100019d2e13","auto_rule":"","auto_time":1,"auto_type":"","col":12,"create_time":1652148028803,"defaultValue":"","extra":"","is_must":1,"is_readonly":1,"is_show":1,"json":[],"jsonarray":[],"name":"config","placeholder":"","remark":"字段配置项,可扩展,如ELEMENT参数","smodel_id":"sfield","status":1,"title":"字段配置项","type":"json","update_time":1652148028803,"validate_rule":"","validate_time":1,"validate_tips":"","validate_type":""}]`
	let sfield_json = `[{"_id": "628b2a502f77c4000146ffd9","auto_time": 1,"col": 12,"create_time": 1653287503748,"is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [],"name": "text","smodel_id": "628b252a0cb5d500018a52bc","status": 1,"title": "枚举文本","type": "string","update_time": 1653287503748,"validate_time": 1},{"_id": "628b2a5d9b54e30001e247a1","auto_time": 1,"col": 12,"create_time": 1653287517246,"is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [],"name": "value","smodel_id": "628b252a0cb5d500018a52bc","status": 1,"title": "枚举值","type": "string","update_time": 1653287517246,"validate_time": 1},{"_id": "628b2acb9b54e30001e25529","auto_time": 1,"col": 12,"create_time": 1653398153044,"is_must": 1,"is_readonly": 1,"is_show": 1,"json": {"smodel": "smodel","text": "title","value": "name"},"jsonarray": [],"name": "smodel","smodel_id": "628b2a807a1d270001cce9d9","status": 1,"title": "模型名称","type": "selectone","update_time": 1653287627165,"validate_time": 1},{"_id": "628b2ae99d207000017b4876","auto_time": 1,"col": 12,"create_time": 1653398153659,"is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [],"name": "value","smodel_id": "628b2a807a1d270001cce9d9","status": 1,"title": "模型数据值","type": "string","update_time": 1653287657174,"validate_time": 1},{"_id": "628b2afbf6d1400001161a05","auto_time": 1,"col": 12,"create_time": 1653398154201,"is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [],"name": "text","smodel_id": "628b2a807a1d270001cce9d9","status": 1,"title": "模型数据键","type": "string","update_time": 1653287674645,"validate_time": 1}]`
	sfields.push(...JSON.parse(sfield_sfield))
	sfields.push(...JSON.parse(sfield_json))
	let smodel_test =`{"_id": "627e69c62319ec0001a664a3","addBtn": 1,"collection": "deme","create_time": 1652766176430,"delBtn": true,"editBtn": 1,"exportBtn": true,"formGroups": [{"fields": ["name","string","text","select","radio","checkbox","multiselect","int","selectone","editor","chooseone","status"],"name": "基础表单"},{"fields": ["rate","switch","colorpicker","timepicker","datepicker","datetimepicker","file","files","image","images","slider","sliderrange"],"name": "高级表单"},{"fields": ["json","jsonarray","cascader"],"name": "配置表单"}],"formType": "tab","girdData": [{"apifun": "","field": "name","fun": "","label": "名称","type": "field","width": "120"},{"apifun": "api_handle_fun","field": "string","fun": "","label": "字符字段","type": "field","width": "120"},{"field": "text","fun": "","label": "文本框","type": "field","width": "120"},{"field": "select","fun": "","label": "下拉单选","type": "field","width": "80"},{"field": "radio","fun": "","label": "单选","type": "field","width": "80"},{"field": "checkbox","fun": "","label": "复选框","type": "field","width": "120"},{"field": "multiselect","fun": "","label": "下拉多选","type": "field","width": "120"},{"field": "int","fun": "","label": "数字","type": "field","width": "80"},{"field": "switch","fun": "","label": "开关","type": "field","width": "80"},{"field": "rate","fun": "","label": "评分","type": "field","width": "150"},{"field": "colorpicker","fun": "","label": "颜色选择器","type": "field","width": "120"},{"field": "datepicker","fun": "","label": "日期选择器","type": "field","width": "120"},{"field": "files","fun": "","label": "多文件上传","type": "field","width": "120"},{"field": "image","fun": "","jsfun": "show_square_image_field","label": "图片上传","type": "fun","width": "120"},{"field": "json","fun": "","label": "JSON对象","type": "field","width": "120"},{"field": "jsonarray","fun": "","label": "JSON数组","type": "field","width": "120"},{"field": "images","fun": "","jsfun": "show_square_images_field","label": "多图片上传","type": "fun","width": "120"},{"field": "selectone","fun": "","label": "下拉外链","type": "field","width": "120"},{"field": "cascader","fun": "","label": "级联选择器","type": "field","width": "120"},{"field": "slider","fun": "","label": "滑块","type": "field","width": "120"},{"field": "sliderrange","fun": "","label": "滑块范围","type": "field","width": "120"},{"field": "","fun": "","label": "操作","type": "action","width": "180"}],"importBtn": true,"multBtn": true,"name": "deme","pageSize": 10,"searchFields": ["string","select","text","radio","checkbox","multiselect","int"],"searchFormFields": ["string","text","select","radio","checkbox","multiselect","int","switch","rate","colorpicker","timepicker","datepicker","datetimepicker","json","jsonarray","selectone","cascader","slider","sliderrange","status"],"status": 1,"title": "演示","type": "db"}`
	smodels.push(JSON.parse(smodel_test))
	let sfield_test =`[{"_id": "627f150474de6300017313ea","auto_time": 1,"col": 12,"create_time": 1652495619853,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "string","placeholder": "输入STRING","remark": "string演示","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "字符字段","type": "string","update_time": 1652495619853,"validate_time": 1},{"_id": "627f1dc9e107d4000118cac9","auto_time": 1,"col": 12,"create_time": 1652497864567,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "text","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "文本框","type": "text","update_time": 1652497864567,"validate_time": 1},{"_id": "627f1e70e89f570001db874d","auto_time": 1,"col": 12,"create_time": 1652498032700,"defaultValue": "1","is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [{"text": "测试1","value": 1},{"text": "测试2","value": 2},{"text": "测试3","value": 3}],"name": "select","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "下拉单选","type": "select","update_time": 1652498032700,"validate_time": 1},{"_id": "627f1ef6d3a5130001c3bfa4","auto_time": 1,"col": 12,"create_time": 1652498166428,"defaultValue": "2","is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [{"text": "单选1","value": 1},{"text": "单选2","value": 2},{"text": "单选3","value": 3}],"name": "radio","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "单选","type": "radio","update_time": 1652498166428,"validate_time": 1},{"_id": "627f219f4069e30001af7abf","auto_time": 1,"col": 12,"create_time": 1652498847747,"defaultValue": "2","is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [{"text": "复选1","value": 1},{"text": "复选2","value": 2},{"text": "复选3","value": 3},{"text": "复选4","value": 4}],"name": "checkbox","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "复选框","type": "checkbox","update_time": 1652498847747,"validate_time": 1},{"_id": "627f21e1f19c12000132b0ac","auto_time": 1,"col": 12,"create_time": 1652498913511,"is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [{"text": "多选1","value": 1},{"text": "多选2","value": 2},{"text": "多选4","value": 4},{"text": "多选3","value": 3}],"name": "multiselect","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "下拉多选","type": "multiselect","update_time": 1652498913511,"validate_time": 1},{"_id": "627f220148168a00013b0643","auto_time": 1,"col": 12,"create_time": 1652498945617,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "int","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "数字","type": "int","update_time": 1652498945617,"validate_time": 1},{"_id": "627f22242319ec0001b84c23","auto_time": 1,"col": 12,"create_time": 1652498980599,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "switch","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "开关","type": "switch","update_time": 1652498980599,"validate_time": 1},{"_id": "627f225397ade30001f73a09","auto_time": 1,"col": 12,"create_time": 1652499026933,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "rate","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "评分","type": "rate","update_time": 1652499026933,"validate_time": 1},{"_id": "627f2269994b190001870099","auto_time": 1,"col": 12,"create_time": 1652499049269,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "colorpicker","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "颜色选择器","type": "colorpicker","update_time": 1652499049269,"validate_time": 1},{"_id": "627f2278b8da120001c3f858","auto_time": 1,"col": 12,"create_time": 1652499063767,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "timepicker","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "时间选择器","type": "timepicker","update_time": 1652499063767,"validate_time": 1},{"_id": "627f22882319ec0001b859f2","auto_time": 1,"col": 12,"create_time": 1652499080290,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "datepicker","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "日期选择器","type": "datepicker","update_time": 1652499080290,"validate_time": 1},{"_id": "627f229cf19c12000132ca8f","auto_time": 1,"col": 12,"create_time": 1652499100650,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "datetimepicker","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "日期时间选择器","type": "datetimepicker","update_time": 1652499100650,"validate_time": 1},{"_id": "627f22ac97ade30001f745cb","auto_time": 1,"col": 12,"create_time": 1652499116046,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "file","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "文件上传","type": "file","update_time": 1652499116046,"validate_time": 1},{"_id": "627f22c32319ec0001b8623b","auto_time": 1,"col": 12,"create_time": 1652499138847,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "files","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "多文件上传","type": "files","update_time": 1652499138847,"validate_time": 1},{"_id": "627f22d8cb3f850001b1ebef","auto_time": 1,"col": 12,"create_time": 1652499158443,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "image","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "图片上传","type": "image","update_time": 1652499158443,"validate_time": 1},{"_id": "627f22e914606700010622f4","auto_time": 1,"col": 12,"create_time": 1652499177723,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "json","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "JSON对象","type": "json","update_time": 1652499177723,"validate_time": 1},{"_id": "627f22fc94b4df000142d3da","auto_time": 1,"col": 12,"create_time": 1652499196703,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "jsonarray","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "JSON数组","type": "jsonarray","update_time": 1652499196703,"validate_time": 1},{"_id": "627f23802319ec0001b87bfb","auto_time": 1,"col": 12,"create_time": 1652499328360,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "images","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "多图片上传","type": "images","update_time": 1652499328360,"validate_time": 1},{"_id": "627f23d605206900018a3d3a","auto_time": 1,"col": 12,"create_time": 1652499414311,"is_must": 1,"is_readonly": 1,"is_show": 1,"json": {"smodel": "sfield","text": "title","value": "_id"},"name": "selectone","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "下拉外链","type": "selectone","update_time": 1652499414311,"validate_time": 1},{"_id": "627f23fd2a3f59000160e6e7","auto_time": 1,"col": 12,"create_time": 1652499452898,"is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [{"children": [{"children": [{"label": "一致","value": "yizhi"}],"label": "设计原则","value": "shejiyuanze"},{"children": [{"label": "侧向导航","value": "cexiangdaohang"}],"label": "导航","value": "daohang"}],"label": "指南","value": "zhinan"},{"children": [{"children": [{"label": "Layout 布局","value": "layout"},{"label": "Color 色彩","value": "color"}],"label": "Basic","value": "basic"},{"children": [{"label": "Radio 单选框","value": "radio"},{"label": "Checkbox 多选框","value": "checkbox"}],"label": "Form","value": "form"},{"children": [{"label": "Table 表格","value": "table"},{"label": "Tag 标签","value": "tag"}],"label": "Data","value": "data"}],"label": "组件","value": "zujian"}],"name": "cascader","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "级联选择器","type": "cascader","update_time": 1652499452898,"validate_time": 1},{"_id": "627f24128264d800011816d0","auto_time": 1,"col": 12,"create_time": 1652499474376,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "slider","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "滑块","type": "slider","update_time": 1652499474376,"validate_time": 1},{"_id": "627f242bc2b30400011c6598","auto_time": 1,"col": 12,"create_time": 1652499499078,"is_must": 1,"is_readonly": 1,"is_show": 1,"name": "sliderrange","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "滑块范围","type": "sliderrange","update_time": 1652499499078,"validate_time": 1},{"_id": "627f825baf15800001aff7d2","auto_time": 1,"col": 12,"create_time": 1652523611111,"defaultValue": "1","is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [{"text": "正常","value": 1},{"text": "删除","value": -1}],"name": "status","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "数据状态","type": "radio","update_time": 1652523611111,"validate_time": 1},{"_id": "628235ff3c4147000113ea32","auto_time": 1,"col": 12,"create_time": 1652700670826,"is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [],"name": "name","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "名称","type": "string","update_time": 1652700670826,"validate_time": 1},{"_id": "6288d8e1f792990001c2166d","auto_time": 1,"col": 12,"create_time": 1653135585731,"is_must": 1,"is_readonly": 1,"is_show": 1,"jsonarray": [],"name": "editor","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "编辑器","type": "editor","update_time": 1653135585731,"validate_time": 1},{"_id": "628b2c34c2cedc000138e5f3","auto_time": 1,"col": 12,"create_time": 1653287988524,"is_must": 1,"is_readonly": 1,"is_show": 1,"json": {"smodel": "sfield","text": "title","value": "_id"},"jsonarray": [],"name": "chooseone","smodel_id": "627e69c62319ec0001a664a3","status": 1,"title": "模型选择器","type": "chooseone","update_time": 1653287988524,"validate_time": 1}]`
	sfields.push(...JSON.parse(sfield_test))
	let test_data = [{"_id": "627f81d1994b1900019319c0","cascader": ["zhinan","daohang","cexiangdaohang"],"checkbox": [2],"chooseone": "62792f3abc65980001b29508","colorpicker": "#000000","datepicker": "2022-05-10T16:00:00.000Z","datetimepicker": 1653588427000,"editor": "<p>你好<img src=\"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-64b0f38b-36b9-47ea-aa7d-432f82a4e4b7/876beb5c-6675-4f90-9e73-d3d7c6ce5dc1.png\" alt=\"logo512.png\" style=\"font-size: 14px; max-width: 100%;\" width=\"30%\"/>aaaaaaabc</p><p>abcadf</p>","file": {"_id": "628755c07a1d270001657fc6","cloudPath": "1653036467675_4.png","create_time": 1653036479753,"fileType": "image","group": 2,"name": "logo512.png","size": 44796,"status": 1,"type": "image/png","url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-64b0f38b-36b9-47ea-aa7d-432f82a4e4b7/876beb5c-6675-4f90-9e73-d3d7c6ce5dc1.png"},"files": [{"_id": "6287aa58cc12f40001b849a3","cloudPath": "1653058134608_0.zip","create_time": 1653058136387,"group": 0,"name": "dc-push_1.0.zip","size": 1045,"status": 1,"type": "application/zip","url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-64b0f38b-36b9-47ea-aa7d-432f82a4e4b7/51773e4a-39ac-4814-bf69-9d48edf1a7bd.zip"},{"_id": "62877f4c68cebc000132f4e1","cloudPath": "1653047105462_0.mp4","create_time": 1653047116339,"fileType": "video","group": 0,"name": "1e53c53560e7f1873a41a43c01fd9868.mp4","size": 3801022,"status": 1,"type": "video/mp4","url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-64b0f38b-36b9-47ea-aa7d-432f82a4e4b7/32c901ff-2632-45f7-977d-cf33c98f5129.mp4"},{"_id": "62877456692769000151f926","cloudPath": "1653044276730_0.mp4","create_time": 1653044310512,"fileType": "video","group": 0,"name": "1e53c53560e7f1873a41a43c01fd9868.mp4","size": 3801022,"status": 1,"type": "video/mp4","url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-64b0f38b-36b9-47ea-aa7d-432f82a4e4b7/b3e224d5-a983-47b5-aa09-c50118bf7cd2.mp4"}],"image": {"_id": "628755c07a1d270001657fc6","cloudPath": "1653036467675_4.png","create_time": 1653036479753,"fileType": "image","group": 2,"name": "logo512.png","size": 44796,"status": 1,"type": "image/png","url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-64b0f38b-36b9-47ea-aa7d-432f82a4e4b7/876beb5c-6675-4f90-9e73-d3d7c6ce5dc1.png"},"images": [{"_id": "6287537f9b54e300017ad9ff","cloudPath": "1653035899866_0.jpeg","create_time": 1653035902391,"fileType": "image","group": 0,"name": "WechatIMG8 (1).jpeg","size": 186148,"status": 1,"type": "image/jpeg","url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-64b0f38b-36b9-47ea-aa7d-432f82a4e4b7/149fc636-60bc-415f-92dc-48ce02b5ad73.jpeg"}],"int": 33,"json": {"bsonType": "array","label": "滑块范围"},"jsonarray": [{"text": "正常","value": 1},{"text": "删除","value": -1}],"multiselect": [4,3],"name": "helloworld1","radio": 2,"rate": 5,"select": 2,"selectone": "62792f392e897900015c6f90","slider": 59,"sliderrange": [17,52],"status": 1,"string": "hello1","switch": true,"text": "world1","timepicker": "23:58:58"},{"_id": "627f9110cb3f850001bfceb9","cascader": ["zujian","data","tag"],"checkbox": [2,4],"colorpicker": "#00FFFF","datepicker": null,"datetimepicker": 1652527365000,"files": [],"images": [],"int": 123,"jsonarray": [],"multiselect": [2,4],"name": "你好世界","radio": 3,"rate": 3,"select": 2,"selectone": "sdaf","slider": 32,"sliderrange": [19,65],"status": 1,"string": "你好","switch": true,"text": "大家好","timepicker": "19:22:35"}]
	//test_data = JSON.parse(test_data)
	await db.collection('deme').add(test_data)
	
	let menu_smodel =
		`{"permission": ["smodel_list","smodel_add","smodel_edit"],"enable": true,"menu_id": "smodel","name": "超级模型","icon": "uni-icons-navigate","url": "/pages/smodel/list","sort": 2000,"parent_id": "","create_date": 1654180339522}`
	menus.push(JSON.parse(menu_smodel))
	let menu_spage =
		`{"permission": ["spage_list","spage_add","spage_edit","spage_del","spage_selectone"],"enable": true,"menu_id": "spage","name": "模型数据","icon": "uni-icons-star","url": "/pages/spage/list","sort": 2050,"parent_id": "","create_date": 1654180411016}`
	menus.push(JSON.parse(menu_spage))
	
	let permission_smodel =
		`[{"_id": "6298cb63c98815000192fb61","comment": "初始化","create_date": 1652690761045,"permission_id": "smodel_add","permission_name": "超级模型添加"},{"_id": "6298cb775c1f6c00018e3e6e","comment": "初始化","create_date": 1652690761045,"permission_id": "smodel_edit","permission_name": "超级模型编辑"},{"_id": "6298cb4bd5771c0001171675","comment": "初始化","create_date": 1652690761045,"permission_id": "smodel_list","permission_name": "超级模型管理"}]`
	permissions.push(...JSON.parse(permission_smodel))
	let permission_spage =
		`[{"_id": "62820f492f77c400014d3dc0","comment": "初始化","create_date": 1652690761354,"permission_id": "spage_add","permission_name": "数据模型新增"},{"_id": "62820f4a996ab20001420382","comment": "初始化","create_date": 1652690762067,"permission_id": "spage_del","permission_name": "数据模型删除"},{"_id": "62820f4997ade30001530a8d","comment": "初始化","create_date": 1652690761764,"permission_id": "spage_edit","permission_name": "数据模型编辑"},{"_id": "62820f495e068d00017f8ff5","comment": "初始化","create_date": 1652690761045,"permission_id": "spage_list","permission_name": "数据模型管理"},{"_id": "62820f4a5e068d00017f9023","comment": "初始化","create_date": 1652690762338,"permission_id": "spage_selectone","permission_name": "数据模型选择器"}]`
	permissions.push(...JSON.parse(permission_spage))

	console.log(smodels, sfields, menus, permissions)
	const transaction = await db.startTransaction()
	try {
		if (smodels.length > 0)
			await db.collection('smodel').add(smodels)
		if (sfields.length > 0)
			await db.collection('sfield').add(sfields)
		if (menus.length > 0)
			await db.collection('opendb-admin-menus').add(menus)
		if (permissions.length > 0)
			await db.collection('uni-id-permissions').add(permissions)
		return {code:0, msg:'初始化数据成功'}
	} catch (e) {
		await transaction.rollback()
		console.error(`transaction error`, e)
		return {code:0, msg:e.message || '请求服务失败'}
	}
};
