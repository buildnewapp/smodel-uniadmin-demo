<template>
	<el-dialog :title="action=='import'?'导入模型':'导出模型'" :visible.sync="dialog" width="30%">
		<view class="" v-loading="loading">
			<view v-if="action=='export'">
				<el-button type="text" @click="exportAction('gen')">重新生成</el-button>
				<el-button type="text" @click="exportAction('copy')">复制代码</el-button>
				<el-button type="text" @click="exportAction('down')">下载文件</el-button>
			</view>
			<view v-if="action=='import'">
				<el-button type="text" @click="importAction('parse')">解析文件</el-button>
				<el-button type="text" @click="importAction('import')">导入模型</el-button>
			</view>
			<pre :contenteditable="true" ref="schemaCode" class="code">
			{{schemaCode}}
			</pre>
		</view>
	</el-dialog>
</template>

<script>
	import {
		download
	} from './smodel'
	import {
		importSmodel,
		exportSmodel
	} from '../api/smodel_api.js'

	export default {
		name: 'SmodelInOut',
		props: {},
		data() {
			return {
				loading: false,
				action: '',
				spage: '',
				dialog: false,
				schemaCode: {},
			}
		},
		computed: {},
		methods: {
			showImport() {
				this.action = 'import'
				this.dialog = true
				this.$nextTick(() => {
					this.schemaCode = {}
				})
			},
			async showExport(spage) {
				this.action = 'export'
				this.spage = spage
				this.dialog = true
				this.$nextTick(() => {
					this.schemaCode = {}
					this.exportAction('gen')
				})
			},
			async importAction(action) {
				if (action == 'parse') {
					let json = this.$refs['schemaCode'].innerHTML
					try {
						let schemaCode = JSON.parse(json)
						let smodel = schemaCode.smodel
						let fields = schemaCode.fields
						if (smodel && smodel.name) {
							this.$message.success('解析成功，模型标识：' + smodel.name + '，模型名称：' + smodel.title)
						} else {
							this.$message.error('解析失败，模型参数必须')
						}
					} catch (e) {
						this.$message.error('解析失败,' + e.message || '请求服务失败');
						console.error(`transaction error`, e)
					}
				} else if (action == 'import') {
					let json = this.$refs['schemaCode'].innerHTML
					importSmodel(json, this)
				}
			},
			async exportAction(action) {
				let that = this
				if (action == 'copy') {
					uni.setClipboardData({
						data: this.$refs['schemaCode'].innerHTML,
						success() {
							that.$message.success('复制成功')
						}
					});
				} else if (action == 'gen') {
					this.loading = true
					this.schemaCode = await exportSmodel(this.spage)
					this.loading = false
				} else if (action == 'down') {
					download(this.$refs['schemaCode'].innerHTML, this.spage + ".smodel.json", "text/plain")
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'smodel.scss';

	.code {
		line-height: 30rpx;
		min-height: 200px;
		border: 1px solid #272822;
		border-radius: 8rpx;
	}
</style>
