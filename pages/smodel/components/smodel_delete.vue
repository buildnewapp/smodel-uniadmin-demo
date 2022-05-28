<template>
	<el-dialog :title="'删除'+stitle+'模型'" :visible.sync="dialog" width="30%">
		<el-form ref="form" :model="form" label-width="100px" size="small" v-loading="loading">
			<el-form-item label="模型标识">
				<el-input v-model="spage"></el-input>
			</el-form-item>
			<el-form-item label="模型数据">
				<el-radio-group v-model="form.smodel_choose" size="mini">
					<el-radio :label="1">虚拟删除</el-radio>
					<el-radio :label="2">真实删除</el-radio>
					<el-radio :label="3">不删除</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="字段数据">
				<el-radio-group v-model="form.sfield_choose" size="mini">
					<el-radio :label="1">虚拟删除</el-radio>
					<el-radio :label="2">真实删除</el-radio>
					<el-radio :label="3">不删除</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="菜单数据">
				<el-radio-group v-model="form.menu_choose" size="mini">
					<el-radio :label="2">真实删除</el-radio>
					<el-radio :label="3">不删除</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="权限数据">
				<el-radio-group v-model="form.permission_choose" size="mini">
					<el-radio :label="2">真实删除</el-radio>
					<el-radio :label="3">不删除</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手动删除">
				<view>
					数据表：{{this.spage}}
				</view>
				<view>
					/pages/{{this.spage}}/目录
				</view>
				<view>
					删除pages.json配置项
				</view>
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
		deleteSmodel
	} from '../api/smodel_api.js'

	export default {
		name: 'SmodelDelete',
		props: {},
		data() {
			return {
				loading: false,
				_id: '',
				spage: '',
				stitle: '',
				dialog: false,
				form: {
					smodel_choose: 1,
					sfield_choose: 3,
					menu_choose: 2,
					permission_choose: 2
				}
			}
		},
		watch: {
			spage: function(n, o) {
				this.spage = n
				this.updateSpage()
			}
		},
		computed: {},
		methods: {
			updateSpage() {},
			async show(row) {
				this._id = row._id
				this.spage = row.name
				this.stitle = row.title
				this.dialog = true
			},
			async handleAction() {
				console.log('this.handleAction', this.form)
				if (this.spage == 'sfield') {
					return this.$message.error('此模型不能删除');
				}
				if (!this._id) return this.$message.error('数据错误');
				this.loading = true
				await deleteSmodel(this._id, this.spage, this.form.smodel_choose, this.form.sfield_choose, this.form
					.menu_choose, this.form.permission_choose, this)
				this.loading = false
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
