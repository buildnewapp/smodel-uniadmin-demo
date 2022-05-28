<template>
	<view>
		<el-select v-model="content" filterable clearable remote :loading="loading" :visible-change="visibleChange"
			:remote-method="remoteSelectone" style="width:100%;">
			<el-option v-for="(item,i) in options" :key="i" :label="item[option.text]" :value="item[option.value]">
				<span style="float: left">{{ item[option.text] }}</span>
				<span style="float: right; color: #8492a6; font-size: 13px">{{ item[option.value] }}</span>
			</el-option>
		</el-select>
	</view>
</template>

<script>
	import {
		smodel_log
	} from '../config.js'
	import debounce from './debounce.js'
	import {
		fetchSelectone
	} from '../api/spage_api.js'
	export default {
		name: 'SmodelSelectone',
		emits: ['input'],
		props: {
			value: String,
			option: {
				type: Object,
				default () {
					return {
						smodel: 'sfield',
						value: '_id',
						text: 'name',
						max: 1
					}
				}
			}
		},
		watch: {
			content(n) {
				smodel_log('selectone watch content', n)
				this.$emit('input', n)
				this.fetchSelectone(n)
			},
			value: {
				handler: function(v, o) {
					smodel_log('selectone watch value', v, o)
					if (v != o) {
						this.content = v
					}
				},
				immediate: true
			},
			option: {
				handler: function(v, o) {
					//smodel_log('selectone watch option', v, o)
					//if (!o || v.smodel != o.smodel) this.fetchSelectone()
				},
				immediate: true
			},
		},
		data() {
			return {
				loading: false,
				content: '-', //设置个默认值，空值会初始化
				options: []
			}
		},
		filters: {
			json2str(val) {
				return JSON.stringify(val)
			}
		},
		computed: {},
		methods: {
			async fetchSelectone(query) {
				this.loading = true
				debounce(async () => {
					this.options = await fetchSelectone(this.option, query, this)
					this.loading = false
				}, 1000)
			},
			remoteSelectone(query) {
				this.fetchSelectone(query)
			},
			visibleChange(visible) {
				console.log('visibleChange', visible)
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'smodel.scss';
</style>
