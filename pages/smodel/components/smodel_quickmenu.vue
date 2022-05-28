<template>
	<el-dialog title="快速添加菜单" :visible.sync="dialogQuickMenu" width="45%">
		<el-form ref="form" :model="quickMenuForm" label-width="80px" size="small" v-loading="loading">
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
				<el-input v-model="quickMenuForm.icon"></el-input>
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
			<el-form-item label="同级排序">
				<el-input v-model="quickMenuForm.sort"></el-input>
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
	const db = uniCloud.database()
	const dbCmd = db.command;
	import {
		smodel_log
	} from '../config.js'
	import {
		getAdminMenus,
		addSmodelMenu
	} from '../api/smodel_api.js'
	import {
		buildMenus
	} from '@/components/uni-data-menu/util.js'
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
					permission: []
				},
				parent_id: [],
				menus: [],
				treeMenu: [],
				treeProps: {
					"value": "_id",
					"label": "name",
					"expandTrigger": "hover",
					checkStrictly: true
				},
				permissionLabels: []
			}
		},
		watch: {
			spage: function(n, o) {
				this.spage = n
				this.updateSpage()
			},
			url_model: function(n, o) {
				this.quickMenuForm.url = n == 1 ? `/pages/${this.spage}/list` : `/pages/spage/list?spage=${this.spage}`
			}
		},
		computed: {},
		methods: {
			updateSpage() {
				this.quickMenuForm = {
					'parent_id': '',
					'menu_id': `${this.spage}_list`,
					'name': `${this.stitle}管理`,
					'icon': `uni-icons-list`,
					'url': `/pages/${this.spage}/list`,
					'sort': 0,
					'enable': true,
					'permission': [`${this.spage}_list`, `${this.spage}_add`, `${this.spage}_edit`,
						`${this.spage}_del`,
						`${this.spage}_selectone`
					],
				}
				this.permissionLabels = [{
						text: `${this.stitle}管理`,
						value: `${this.spage}_list`
					},
					{
						text: `${this.stitle}新增`,
						value: `${this.spage}_add`
					},
					{
						text: `${this.stitle}编辑`,
						value: `${this.spage}_edit`
					},
					{
						text: `${this.stitle}删除`,
						value: `${this.spage}_del`
					},
					{
						text: `${this.stitle}选择器`,
						value: `${this.spage}_selectone`
					},
				]
			},
			async show(row) {
				this.spage = row.name
				this.stitle = row.title
				let menus = await getAdminMenus()
				let ms = buildMenus(menus.result.data, false)
				this.menus = menus
				this.treeMenu = ms
				this.updateSpage()
				this.dialogQuickMenu = true
			},
			async handleQuickMenuAction() {
				if (this.parent_id.length > 0) this.quickMenuForm.parent_id = this.parent_id[this.parent_id.length - 1]
				this.quickMenuForm.sort = this.quickMenuForm.sort * 1
				smodel_log('this.quickMenuForm', this.quickMenuForm)
				this.loading = true
				let map = {}
				for (let pl of this.permissionLabels) {
					map[pl.value] = pl
				}
				await addSmodelMenu(this.quickMenuForm, this)
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
