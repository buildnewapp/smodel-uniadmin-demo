<template>
	<view>
		<el-row>
			<el-col :span="24" class="u-text-center u-m-b-60">
				<el-button size="mini" @click="emitEvent('status')">status</el-button>
				<el-button size="mini" @click="emitEvent('create_time')">create_time</el-button>
				<el-button size="mini" @click="emitEvent('enums')">枚举示例</el-button>
				<el-button size="mini" @click="emitEvent('selectone')">下拉外链</el-button>
				<el-button size="mini" @click="emitEvent('chooseone')">模型选择器</el-button>
				<el-button size="mini" @click="emitEvent('alert')">展示alert</el-button>
			</el-col>
		</el-row>
	</view>
</template>

<script>
	export default {
		name: 'SfieldEdit',
		props: {},
		data() {
			return {
				fields: {
					status: {
						'name': 'status',
						'title': '数据状态',
						'type': 'radio',
						'defaultValue': 1,
						'jsonarray': [{
							"text": "正常",
							"value": 1
						}, {
							"text": "删除",
							"value": -1
						}]
					},
					create_time: {
						'name': 'create_time',
						'title': '创建时间',
						'type': 'datetimepicker'
					},
					enums: {
						'name': 'enums',
						'title': '枚举',
						'type': 'select',
						'jsonarray': [{
							"text": "数据1",
							"value": 1
						}, {
							"text": "数据2",
							"value": 2
						}]
					},
					selectone: {
						'name': 'data_id',
						'title': '关联数据',
						'type': 'selectone',
						'json': {
							smodel: 'demo',
							value: '_id',
							text: 'name'
						}
					},
					chooseone: {
						'name': 'data_id',
						'title': '关联数据',
						'type': 'chooseone',
						'json': {
							smodel: 'demo',
							value: '_id',
							text: 'name'
						}
					},
					alert: {
						'name': 'alert_name',
						'title': '展示配置',
						'type': 'alert',
						'config': {
							type: 'info',
							title: '你好你好',
							description: 'hello alert',
							closable: true
						}
					}
				}
			}
		},
		computed: {},
		methods: {
			emitEvent(field) {
				this.$emit('sfield_edit_event', this.fields[field])
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'smodel.scss';
</style>
