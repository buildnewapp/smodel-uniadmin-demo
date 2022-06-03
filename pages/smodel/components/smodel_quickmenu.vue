<template>
	<el-dialog title="快速添加菜单" :visible.sync="dialogQuickMenu" width="45%">
		<el-form ref="form" :model="quickMenuForm" label-width="80px" size="small" v-loading="loading">
			<el-form-item label="注意事项" v-if="mode=='vk_admin'">
				vk-admin和uni-admin表结构存在差异，<br>
				1 下载所有DB Schema <br>
				2 vk-admin需要添加额外字段：<br>
				<el-popover placement="bottom" width="400" trigger="hover">
					<pre :contenteditable="true">
添加以下代码到 opendb-admin-menus.schema.json:						
"hidden_menu": {
	"bsonType": "bool",
	"label": "隐藏菜单"
}
							  </pre>
					<el-button type="text" slot="reference">opendb-admin-menus</el-button>
				</el-popover>
				<el-popover placement="bottom" width="400" trigger="hover" class="u-m-l-20">
					<pre :contenteditable="true">
添加以下代码到 uni-id-permissions.schema.json:
"enable": {
	"bsonType": "bool",
	"label": "是否启用"
},
"match_mode": {
	"bsonType": "int",
	"label": "匹配模式"
},
"curd_category": {
	"bsonType": "int",
	"label": "权限分类"
},
"level": {
	"bsonType": "int",
	"label": "权限级别"
},
"parent_id": {
	"bsonType": "string",
	"label": "父级权限"
},
"sort": {
	"bsonType": "int",
	"label": "排序"
},
"url": {
	"bsonType": "array",
	"label": "URL"
}
											  </pre>
					<el-button type="text" slot="reference">uni-id-permissions</el-button>
				</el-popover>
			</el-form-item>
			<el-form-item label="模型标识">
				<el-input v-model="spage"></el-input>
			</el-form-item>
			<el-form-item label="父级菜单">
				<el-cascader v-model="parent_id" :options="treeMenu" style="width: 100%;"
					:props="{value:'menu_id',label:'name',expandTrigger:'hover',checkStrictly:true}" clearable>
				</el-cascader>
			</el-form-item>
			<el-form-item label="菜单标识">
				<el-input v-model="quickMenuForm.menu_id"></el-input>
			</el-form-item>
			<el-form-item label="菜单名称">
				<el-input v-model="quickMenuForm.name"></el-input>
			</el-form-item>
			<el-form-item label="菜单图标">
				<el-input v-model="quickMenuForm.icon">
					<view slot="append">
						<el-link type="primary" href="/admin/#/pages/demo/icons/icons" target="_blank">icon</el-link>
					</view>
				</el-input>
			</el-form-item>
			<el-form-item label="页面链接">
				<el-input v-model="quickMenuForm.url">
					<view class="" slot="append">
						<el-radio-group v-model="url_model" size="mini">
							<el-radio-button label="1">页面</el-radio-button>
							<el-radio-button label="2">参数</el-radio-button>
						</el-radio-group>
					</view>
				</el-input>
				<view v-if="url_model==1" class="u-font-sm u-error-color">
					页面模式，需要手动部署页面和配置，参考『部署』功能
				</view>
			</el-form-item>
			<el-form-item label="下级页面" v-if="mode=='vk_admin'">
				<el-checkbox-group v-model="quickMenuForm.submenus">
					<el-checkbox v-for="(menu,pindex) in submenuLabels" :label="menu.value" :key="pindex">
						{{menu.text}}[{{menu.value}}]
					</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="同级排序">
				<el-input v-model="quickMenuForm.sort"></el-input>
			</el-form-item>
			<el-form-item label="父级权限" v-if="mode=='vk_admin'">
				<el-cascader v-model="parent_permission_id" :options="treePermission" style="width: 100%;"
					:props='{"value": "permission_id","label": "permission_name","expandTrigger": "hover",checkStrictly: true}'
					clearable>
				</el-cascader>
			</el-form-item>
			<el-form-item label="权限集合">
				<el-checkbox-group v-model="quickMenuForm.permission">
					<el-checkbox v-for="(permission,pindex) in permissionLabels" :label="permission.value"
						:key="pindex">{{permission.text}}[{{permission.value}}]</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogQuickMenu = false">取 消</el-button>
			<el-button type="primary" @click="handleQuickMenuAction">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		smodel_log,
		mode
	} from '../config.js'
	import {
		getAdminMenus,
		getAdminPermissions,
		addSmodelMenu
	} from '../api/smodel_api.js'

	function buildTree(list, parentId, id, children) {
		list.forEach(item => {
			let subs = list.filter(v => item[id] === v[parentId])
			item[children] = subs.length > 0 ? item[children] = subs : []
		})
		return list.filter(v => !v[parentId])

	}
	export default {
		name: 'SmodelQuickmenu',
		props: {},
		data() {
			return {
				loading: false,
				url_model: 1,
				spage: '',
				stitle: '',
				dialogQuickMenu: false,
				quickMenuForm: {
					permission: [],
					submenus: []
				},
				parent_id: [],
				treeMenu: [],
				parent_permission_id: [],
				treePermission: [],
				permissionLabels: [],
				submenuLabels: [],
				mode: mode
			}
		},
		watch: {
			spage: function(n, o) {
				this.spage = n
				this.updateSpage()
			},
			url_model: function(n, o) {
				this.quickMenuForm.url = n == 1 ? `/pages/${this.spage}/list` : `/pages/spage/list?spage=${this.spage}`
				let add_url = n == 1 ? `/pages/${this.spage}/add` : `/pages/spage/add?spage=${this.spage}`
				let edit_url = n == 1 ? `/pages/${this.spage}/edit` : `/pages/spage/edit?spage=${this.spage}`
				this.submenuLabels = [{
						text: `新增${this.stitle}`,
						value: add_url,
						menu_id: `${this.spage}_add`
					},
					{
						text: `编辑${this.stitle}`,
						value: edit_url,
						menu_id: `${this.spage}_edit`
					}
				]
				this.quickMenuForm.submenus = [add_url, edit_url]
			}
		},
		computed: {},
		methods: {
			updateSpage() {
				this.quickMenuForm = {
					'parent_id': '',
					'menu_id': `${this.spage}-list`,
					'name': `${this.stitle}管理`,
					'icon': `uni-icons-list`,
					'url': `/pages/${this.spage}/list`,
					'sort': 0,
					'enable': true,
					'permission': [`${this.spage}-list`, `${this.spage}-add`, `${this.spage}-edit`,
						`${this.spage}-del`,
						`${this.spage}-selectone`
					],
					'submenus': [`/pages/${this.spage}/add`, `/pages/${this.spage}/edit`]
				}
				this.permissionLabels = [{
						text: `${this.stitle}管理`,
						value: `${this.spage}-list`
					},
					{
						text: `${this.stitle}新增`,
						value: `${this.spage}-add`
					},
					{
						text: `${this.stitle}编辑`,
						value: `${this.spage}-edit`
					},
					{
						text: `${this.stitle}删除`,
						value: `${this.spage}-del`
					},
					{
						text: `${this.stitle}选择器`,
						value: `${this.spage}-selectone`
					},
				]
				this.submenuLabels = [{
						text: `新增${this.stitle}`,
						value: `/pages/${this.spage}/add`,
						menu_id: `${this.spage}-add`
					},
					{
						text: `编辑${this.stitle}`,
						value: `/pages/${this.spage}/edit`,
						menu_id: `${this.spage}-edit`
					}
				]
			},
			async show(row) {
				this.dialogQuickMenu = true
				this.loading = true
				this.spage = row.name
				this.stitle = row.title
				if (mode == 'vk_admin') {
					let permissions = await getAdminPermissions()
					this.treePermission = buildTree(permissions.result.data, 'parent_id', 'permission_id', 'children')
				}
				let menus = await getAdminMenus()
				this.treeMenu = buildTree(menus.data, 'parent_id', 'menu_id', 'children')
				this.updateSpage()
				this.loading = false
			},
			async handleQuickMenuAction() {
				this.loading = true
				let parent_id = this.parent_id.length > 0 ? this.parent_id[this.parent_id.length - 1] : null
				let mainMenu = {
					"_id": this.quickMenuForm.menu_id,
					"parent_id": parent_id,
					"enable": true,
					"hidden_menu": false,
					"icon": this.quickMenuForm.icon,
					"menu_id": this.quickMenuForm.menu_id,
					"name": this.quickMenuForm.name,
					"sort": this.quickMenuForm.sort * 1,
					"url": this.quickMenuForm.url,
				}

				let menus = [mainMenu]
				if (mode == 'vk_admin') {
					let mmap = {}
					for (let item of this.submenuLabels) {
						mmap[item.value] = item
					}
					for (let v of this.quickMenuForm.submenus) {
						let menu = mmap[v]
						let sub = Object.assign({}, mainMenu, {
							_id: menu.menu_id,
							parent_id: mainMenu._id,
							permission: [],
							hidden_menu: true,
							url: v,
							menu_id: menu.menu_id,
							name: menu.text
						})
						menus.push(sub)
					}
				}

				let map = {}
				for (let pl of this.permissionLabels) {
					map[pl.value] = pl
				}
				let permissions = []
				for (let p of this.quickMenuForm.permission) {
					let parent_id = `${this.spage}-list`
					if (p == `${this.spage}-list`) parent_id = this.parent_permission_id.length > 0 ? this
						.parent_permission_id[this.parent_permission_id.length - 1] : null
					let permission = map[p]
					let uip = {
						"_id": permission.value,
						"enable": true,
						"match_mode": 0,
						"curd_category": 4,
						"level": 3,
						"parent_id": parent_id,
						permission_id: permission.value,
						permission_name: permission.text,
						comment: this.quickMenuForm.name + '自动添加',
						"sort": 1,
						"url": []
					}
					permissions.push(uip)
				}
				smodel_log(menus, permissions)
				await addSmodelMenu(menus, permissions, this)
				this.loading = false
				this.dialogQuickMenu = false
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'smodel.scss';

	.code {
		min-height: 100rpx;
		line-height: 32rpx;
		border: 1px solid;
		border-radius: 8rpx;
	}
</style>
