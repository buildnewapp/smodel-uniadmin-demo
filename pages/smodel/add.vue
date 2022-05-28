<template>
	<view class="smodel">
		<el-form ref="form" :model="form" :rules="rules" label-width="200rpx" :status-icon=true>
			<el-form-item label="模型标识" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="模型名称" prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="模型类型" prop="type">
				<el-radio-group v-model="form.type">
					<el-tooltip content="真实数据表/集合,需要查库" placement="top">
						<el-radio label="db">数据模型</el-radio>
					</el-tooltip>
					<el-tooltip content="JSON字段配置,只需要配置字段和表单即可" placement="top">
						<el-radio label="json">JSON模型</el-radio>
					</el-tooltip>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('form')">立即创建</el-button>
				<el-button @click="resetForm('form')">重置</el-button>
			</el-form-item>
		</el-form>
	</view>
</template>

<script>
	import {
		addSmodel
	} from './api/smodel_api.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					title: '',
					type: 'db',
				},
				rules: {
					name: [{
							required: true,
							message: '请输入模型标识',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					title: [{
						required: true,
						message: '模型名称',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '模型类型',
						trigger: 'blur'
					}],
				}
			}
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			this.init(options)

		},
		// 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady() {},
		// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
		onShow() {},
		// 监听 - 页面每次【隐藏时】执行(如：返回)
		onHide() {},
		// 函数
		methods: {
			// 页面数据初始化函数
			async submitForm(formName) {
				console.log('formName', formName)
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						this.form.collection = this.form.name
						addSmodel(this.form).then(res => {
							this.$message.success('添加模型成功')
							uni.$emit('smodel_add_ok', {})
							uni.navigateBack({
								animationDuration: 1500
							})
						}).catch(err => {
							console.error('add model error:', err)
							this.$message.error('添加模型错误');
						})
						console.log('submit!', this.form);
					} else {
						console.error('error submit!!', this.form);
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			init(options) {},
		},
		// 过滤器
		filters: {

		},
		// 计算属性
		computed: {

		}
	}
</script>
<style lang="scss" scoped>
	.smodel {
		padding: 40rpx;
	}
</style>
