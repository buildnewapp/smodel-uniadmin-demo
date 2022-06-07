<template>
	<view>
		<template v-if="col.jsfun=='show_rectangle_image_field'">
			<el-image  fit="cover" style="width: 100px; height: 50px" v-if="row[col.field]"
				:src="row[col.field].url" :preview-src-list="[row[col.field].url]"></el-image>
		</template>
		<template v-else-if="col.jsfun=='show_rectangle_images_field'">
			<el-image  fit="cover" style="width: 60px; height: 30px" v-for="(file,findex) in row[col.field]"
				:src="file.url" :preview-src-list="[file.url]"></el-image>
		</template>
		<template v-else-if="col.jsfun=='show_square_image_field'">
			<el-image v-if="row[col.field]" fit="cover" style="width: 50px; height: 50px"
				:src="row[col.field].url" :preview-src-list="[row[col.field].url]"></el-image>
		</template>
		<template v-else-if="col.jsfun=='show_square_images_field'">
			<el-image  fit="cover" style="width: 40px; height: 40px" v-for="(file,findex) in row[col.field]"
				:src="file.url" :preview-src-list="[file.url]"></el-image>
		</template>
		<view v-else-if="col.jsfun=='copy_field'">
			<el-tooltip effect="dark" content="点击复制内容" placement="top">
				<el-button type="text" @click="copy(row[col.field])">{{ row[col.field] }}</el-button>
			</el-tooltip>
		</view>
		<view v-else class="">
			<el-tooltip effect="dark" :content="col.jsfun+'函数不存在'" placement="top">
				<el-button type="text">{{ row[col.field] }}</el-button>
			</el-tooltip>
		</view>
	</view>
</template>

<script>
	import {
		copy
	} from './smodel.js'
	export default {
		name: 'SpageJsfun',
		data() {
			return {
				loading: false
			}
		},
		props: {
			col: {
				type: Object,
				default () {
					return {
						jsfun: '',
						field: ''
					}
				}
			},
			row: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		watch: {},
		computed: {},
		methods: {
			copy(text) {
				copy(text, () => {
					this.$message.success('复制成功')
				})
			},
			saveDevRate() {
				let that = this
				console.log('saveDevRate', this.row)
				uni.vk.callFunction({
					url: "admin/plugin/kh/saveDevRate",
					data: {
						plugin_id: this.row.plugin_id,
						dev_rate: this.row.dev_rate,
						dev_remark: this.row.dev_remark,
					},
					success(data) {
						console.log('saveDevRate', data)
						that.$message.success("修改成功条数:"+data.num)
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'smodel.scss';
</style>
