<template>
	<el-dialog title="初始化模型和字段数据" :visible.sync="dialog" width="600px">
		<el-form ref="form" :model="form" label-width="80px" size="small" v-loading="loading">
			<el-form-item label="字段模型">
				<el-checkbox v-model="form.smodel_sfield" disabled>模型</el-checkbox>
				<el-checkbox v-model="form.sfield_sfield" disabled>字段数据</el-checkbox>
				<el-alert title="核心数据表,记录表的字段数据,是字段的基础" type="error" :closable="false"></el-alert>
			</el-form-item>
			<el-form-item label="演示模型">
				<el-checkbox v-model="form.smodel_test">模型</el-checkbox>
				<el-checkbox v-model="form.sfield_test">字段数据</el-checkbox>
				<el-alert title="deme表,包含所有字段演示,表格和表单" type="success" :closable="false"></el-alert>
			</el-form-item>
			<el-form-item label="后台菜单">
				<el-checkbox v-model="form.menu_smodel">超级模型</el-checkbox>
				<el-checkbox v-model="form.menu_spage">模型数据</el-checkbox>
				<el-alert title="超级模型功能菜单集,建议添加" type="warning" :closable="false"></el-alert>
			</el-form-item>
			<el-form-item label="后台权限">
				<el-checkbox v-model="form.permission_smodel">超级模型</el-checkbox>
				<el-checkbox v-model="form.permission_spage">模型数据</el-checkbox>
				<el-alert title="超级模型功能权限集,建议添加" type="warning" :closable="false"></el-alert>
			</el-form-item>
			<el-form-item label="后台架构">
				<el-radio v-model="form.admin_mode" label="uni_admin">uni-admin</el-radio>
				<el-radio v-model="form.admin_mode" label="vk_admin">vk-admin</el-radio>
				<el-alert :title="'当前后台架构：'+mode" description="注意后台模式，否则权限和菜单可能存在BUG" type="warning" :closable="false">
				</el-alert>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialog = false">取 消</el-button>
			<el-button type="primary" @click="handleAction">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		initSmodel
	} from '../api/smodel_api.js'
	import {
		smodel_log,
		mode
	} from '../config.js'
	export default {
		name: 'SmodelInit',
		props: {},
		data() {
			return {
				form: {
					smodel_sfield: true,
					sfield_sfield: true,
					smodel_test: true,
					sfield_test: true,
					menu_smodel: true,
					menu_spage: true,
					permission_smodel: true,
					permission_spage: true,
					admin_mode: mode,
				},
				mode: mode,
				loading: false,
				dialog: false,
			}
		},
		computed: {},
		methods: {
			show() {
				this.dialog = true
			},
			async handleAction() {
				console.log('form', this.form)
				this.loading = true
				await initSmodel(this.form)
				uni.$emit('smodel_add_ok', {})
				this.loading = false
				this.dialog = false
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'smodel.scss';
</style>
